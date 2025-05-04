import { TOrder } from '@utils-types';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk('order/getOrders', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

type TOrderState = {
  error: string | null;
  order: TOrder | null;
  orders: TOrder[];
  loading: boolean;
};

export const initialState: TOrderState = {
  error: null,
  order: null,
  loading: false,
  orders: []
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
  extraReducers(builder) {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    builder.addCase(getOrderByNumber.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.orders[0];
    });
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    builder.addCase(orderBurger.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
      state.orders.push(action.payload.order);
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
  }
});

export const { getOrderData, getSelectorOrder } = orderSlice.selectors;

export const { clearBurgerOrder } = orderSlice.actions;

const orderReducer = orderSlice.reducer;
export default orderReducer;
