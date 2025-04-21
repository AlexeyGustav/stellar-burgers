import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import { getCookie } from '../../utils/cookie';
import { getUserApi } from '../../utils/burger-api';

type TUserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  error?: string | null;
};

// получение информации о пользователе
export const getUser = createAsyncThunk('user/getUser', getUserApi);

const initialState: TUserState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: true,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserData: (state) => state.user,
    getIngridients: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
  }
});

export const { getUserData, getIngridients, getAuthChecked } =
  userSlice.selectors;

const userReducer = userSlice.reducer;
export default userReducer;
