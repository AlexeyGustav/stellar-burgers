import { TOrder } from '@utils-types';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk('order/getOrders', getOrdersApi);

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

type TOrderState = {
  error: string | null;
  order: TOrder | null;
  loading: boolean;
};

export const initialState: TOrderState = {
  error: null,
  order: null,
  loading: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearBurgerOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrderData: (state) => state.order,
    getSelectorOrder: (state) => state.loading
  },
  extraReducers: (builder) => {
    // добавление заказa
    builder.addCase(orderBurger.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
      state.error = null;
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ||
        'Необходимо указать идентификаторы ингредиентов';
      // state.error = action.error.message || 'Вы должны быть авторизованы';
    });
  }
});

export const { getOrderData, getSelectorOrder } = orderSlice.selectors;

export const { clearBurgerOrder } = orderSlice.actions;

const orderReducer = orderSlice.reducer;
export default orderReducer;
