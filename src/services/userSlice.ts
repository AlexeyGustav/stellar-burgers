import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import { getCookie } from '../utils/cookie';
import { getUserApi } from '../utils/burger-api';

type TUserState = {
  userData: TUser | null;
  // registerData: TRegisterData;
  isAuthChecked: boolean;
  // isAuthenticated: boolean;
  // error: string | null;
  // loading: boolean;
};

const initialState: TUserState = {
  userData: null,
  isAuthChecked: false
  // .................
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  }
});

// мы получаем в переменную isAuthChecked статус запроса пользователя. Он используется для отображения прелоадера в момент загрузки информации о пользователе. Само значение isAuthChecked внутри хранилища меняется после попытки получить статус авторизации пользователя:

export const checkUserAuth = createAsyncThunk(
  'user/checkUser', // Тип действия (префикс для автоматически генерируемых действий)
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      // await dispatch(getUserApi()); // Ожидаем завершения промиса
      dispatch(authChecked());
    } else {
      dispatch(authChecked());
    }
  }
);

export const { authChecked } = userSlice.actions;
