import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIngredientDetails,
  getSelectorIngredients
} from 'src/services/slices/ingridientsSlice';
import { getUser } from 'src/services/slices/userSlice';

export const IngredientDetails: FC = () => {
  // Компоненты могут использовать useSelector для доступа к состоянию ингредиентов:
  const ingredientData = useSelector(getSelectorIngredients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientDetails());
    dispatch(getUser());
  }, [dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
