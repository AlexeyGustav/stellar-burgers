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

const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: ''
};

export const ingridientSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  selectors: {
    getSelectorIngredientsLoading: (state) => state.loading,
    getSelectorIngredients: (state) => state.ingredients,
    getSelectorIngredientId: (state, id: string) =>
      state.ingredients.find((item) => item._id === id)
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
      state.error = action.error.message || 'Unknown error';
    });
  }
});

export const {
  getSelectorIngredientsLoading,
  getSelectorIngredients,
  getSelectorIngredientId
} = ingridientSlice.selectors;

export const ingredientsReducer = ingridientSlice.reducer;
