import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './slices/ingridientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerСonstructor: burgerConstructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
