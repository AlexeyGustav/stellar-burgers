import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';

type TUserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  error?: string | null;
};

// получение информации о пользователе
export const getUser = createAsyncThunk(
  'user/fetchGetUser',
  async (_, { dispatch, rejectWithValue }) => {
    console.log('Запускаю получение пользователя...');

    try {
      const reply = await getUserApi();

      if (!reply.success) {
        console.error(`API вернуло ошибку: ${JSON.stringify(reply)}`);
        return rejectWithValue(reply); // Возвращаем объект ошибки дальше
      }

      console.log('Получены успешные данные:', JSON.stringify(reply));
      return reply; // Если всё хорошо — возвращаем данные
    } catch (error) {
      console.error('Ошибка сети или неизвестная ошибка:', error);
      return rejectWithValue('Ошибка'); // Обработка общей ошибки
    }
  }
);

// вход пользователя
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const dataUser = await loginUserApi(data);
    console.log(data);
    console.log('dataUser: ', dataUser);
    setCookie('accessToken', dataUser.accessToken);
    // localStorage.setItem('accessToken', dataUser.accessToken); // Сохранение токенов
    localStorage.setItem('refreshToken', dataUser.refreshToken); // Сохранение токенов
    // setCookie('refreshToken', dataUser.refreshToken);
    // setCookie('accessToken', dataUser.accessToken);
    return dataUser;
  }
);

// регистрация пользователя
export const registerUser = createAsyncThunk(
  'user/fetchRegister',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

// выход из системы
export const logoutUser = createAsyncThunk('user/fetchLogout', async () => {
  try {
    const response = await logoutApi();
    localStorage.clear();
    deleteCookie('refreshToken');
    deleteCookie('accessToken');
    return response;
  } catch (error) {
    throw error;
  }
});

// обновление данных пользователя
export const updateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (user: Partial<TRegisterData>) => {
    try {
      console.log(`новые данные пользователя`, user);
      return updateUserApi(user);
    } catch (error) {
      throw error;
    }
  }
);

const initialState: TUserState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserData: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    isAuthenticated: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = true;
      state.error =
        action.error.message || 'Вы должны быть уполномочены, ошибка getUser';
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Не найдено, ошибка loginUser';
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthChecked = false;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Не найдено, ошибка registerUser';
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Не найдено, ошибка updateUser';
    });
  }
});

export const { getUserData, getAuthChecked, isAuthenticated } =
  userSlice.selectors;

const userReducer = userSlice.reducer;
export default userReducer;
