import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';

type TUserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  error?: string | null;
};

// получение информации о пользователе
export const getUser = createAsyncThunk('user/fetchGetUser', getUserApi);

// вход пользователя
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const dataUser = await loginUserApi(data);
    localStorage.setItem('accessToken', dataUser.accessToken); // Сохранение токенов
    localStorage.setItem('refreshToken', dataUser.refreshToken); // Сохранение токенов
    setCookie('refreshToken', dataUser.refreshToken);
    setCookie('accessToken', dataUser.accessToken);
    return dataUser;
  }
);

// регистрация пользователя
export const registerUser = createAsyncThunk(
  'user/fetchRegister',
  async (data: TRegisterData) => {
    const userRegistration = await registerUserApi(data);
    localStorage.setItem('accessToken', userRegistration.accessToken);
    localStorage.setItem('refreshToken', userRegistration.refreshToken);
    setCookie('refreshToken', userRegistration.refreshToken);
    setCookie('accessToken', userRegistration.accessToken);
    return userRegistration;
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
  }
});

export const { getUserData, getAuthChecked } = userSlice.selectors;

const userReducer = userSlice.reducer;
export default userReducer;
