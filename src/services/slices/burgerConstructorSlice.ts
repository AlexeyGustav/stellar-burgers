import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type IBurgerConstructorSlice = {
  bun: null | { price: number };
  ingredients: null | Array<TIngredient>;
  orderRequest: boolean;
  orderModalData: null;
};

const initialState: IBurgerConstructorSlice = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerconstructor',
  initialState,
  reducers: {},
  selectors: {
    getSelectorConstructorBurger: (state) => state
  }
});

export const { getSelectorConstructorBurger } =
  burgerConstructorSlice.selectors;

const burgerConstructorReducer = burgerConstructorSlice.reducer;
export default burgerConstructorReducer;
