import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

type TOrderInfo = {
  error: string | null;
  loading: boolean;
  order: TOrder | null;
};

export const initialState: TOrderInfo = {
  error: null,
  loading: false,
  order: null
};

const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  selectors: {
    getOrderInfo: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не найдено, ошибка getOrderByNumber';
      });
  }
});

export const { getOrderInfo } = orderInfoSlice.selectors;

const orderInfoReducer = orderInfoSlice.reducer;
export default orderInfoReducer;
