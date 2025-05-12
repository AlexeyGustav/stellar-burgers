import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

// получение ингридиентов
export const fetchIngredientDetails = createAsyncThunk(
  'ingridients/getIngridients',
  getIngredientsApi
);

type TIngredientState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error?: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: ''
};

export const ingridientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getSelectorIngredientsLoading: (state) => state.loading,
    getSelectorIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredientDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchIngredientDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload; //содержит данные, возвращенные из асинхронной функции getIngredientsApi
    });
    builder.addCase(fetchIngredientDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Неизвестная ошибка';
    });
  }
});

export const { getSelectorIngredientsLoading, getSelectorIngredients } =
  ingridientSlice.selectors;

export const ingredientsReducer = ingridientSlice.reducer;
export default ingredientsReducer;
