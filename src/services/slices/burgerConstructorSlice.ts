import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type IBurgerConstructorSlice = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
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
  name: 'burgerСonstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingridient = action.payload;
        if (ingridient.type === 'bun') {
          state.bun = ingridient;
        } else {
          state.ingredients.push(ingridient);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, { payload }: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== payload
      );
    },
    handleMove: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      if (
        fromIndex < 0 ||
        fromIndex >= state.ingredients.length ||
        toIndex < 0 ||
        toIndex >= state.ingredients.length
      ) {
        return; // Ничего не делаем, если индексы некорректны
      }

      const ingredients = [...state.ingredients]; // Создаем копию массива
      const [movedIngredient] = ingredients.splice(fromIndex, 1); // Удаляем элемент из fromIndex
      ingredients.splice(toIndex, 0, movedIngredient); // Вставляем элемент в toIndex

      state.ingredients = ingredients; // Обновляем состояние
    },
    clearIngridients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getSelectorConstructorBurger: (state) => state
  }
});

export const { addIngredient, removeIngredient, handleMove, clearIngridients } =
  burgerConstructorSlice.actions;

export const { getSelectorConstructorBurger } =
  burgerConstructorSlice.selectors;

const burgerConstructorReducer = burgerConstructorSlice.reducer;
export default burgerConstructorReducer;
