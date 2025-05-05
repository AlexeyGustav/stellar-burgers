import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk('order/getOrders', getOrdersApi);

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

type TOrderState = {
  error: string | null;
  order: TOrder | null;
  orders: TOrder[];
  loading: boolean;
  orderRequest: boolean;
};

export const initialState: TOrderState = {
  error: null,
  order: null,
  loading: false,
  orders: [],
  orderRequest: false
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
    getOrdersData: (state) => state.orders,
    getSelectorOrder: (state) => state.loading,
    getOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message || 'Не найдено, ошибка fetchOrders';
      })

      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.order = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.error = action.error.message || 'Не найдено, ошибка orderBurger';
      });
  }
});

export const {
  getOrderData,
  getSelectorOrder,
  getOrdersData,
  getOrderRequest
} = orderSlice.selectors;

export const { clearBurgerOrder } = orderSlice.actions;

const orderReducer = orderSlice.reducer;
export default orderReducer;
