import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSelectorIngredients } from '../../services/slices/ingridientsSlice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const location = useLocation();
  const ingredients = useSelector(getSelectorIngredients);

  const id = location.pathname.split('/').pop();

  const ingredientData = ingredients.find(
    (ingredients: TIngredient) => ingredients._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
