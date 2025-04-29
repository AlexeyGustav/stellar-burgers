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
export const getUser = createAsyncThunk('user/fetchUser', getUserApi);

// вход пользователя
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    try {
      const dataUser = await loginUserApi(data);
      console.log('dataUser: ', dataUser);
      localStorage.setItem('accessToken', dataUser.accessToken); // Сохранение токенов
      localStorage.setItem('refreshToken', dataUser.refreshToken); // Сохранение токенов
      setCookie('refreshToken', dataUser.refreshToken);
      setCookie('accessToken', dataUser.accessToken);
      return dataUser;
    } catch (error) {
      throw error;
    }
  }
);

// регистрация пользователя
export const registerUser = createAsyncThunk(
  'user/fetchRegister',
  async (data: TRegisterData) => {
    try {
      const userRegistration = await registerUserApi(data);
      localStorage.setItem('accessToken', userRegistration.accessToken);
      localStorage.setItem('refreshToken', userRegistration.refreshToken);
      setCookie('refreshToken', userRegistration.refreshToken);
      setCookie('accessToken', userRegistration.accessToken);
      return userRegistration;
    } catch (error) {
      throw error;
    }
  }
);

// выход из системы
export const logoutUser = createAsyncThunk('user/fetchLogout', async () => {
  try {
    const res = await logoutApi();
    localStorage.clear();
    deleteCookie('refreshToken');
    deleteCookie('accessToken');
    return res;
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
      state.loading = false;
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
