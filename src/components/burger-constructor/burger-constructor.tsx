import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getSelectorConstructorBurger,
  clearIngridients
} from '../../services/slices/burgerConstructorSlice';
import {
  clearBurgerOrder,
  getOrderData,
  getSelectorOrder,
  orderBurger
} from '../../services/slices/orderSlice';
import { isAuthenticated } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getSelectorConstructorBurger);
  const authenticated = useSelector(isAuthenticated);
  const orderRequest = useSelector(getSelectorOrder);
  const orderModalData = useSelector(getOrderData);

  // Оформить заказ
  const onOrderClick = () => {
    if (!authenticated) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const bunId = constructorItems ? constructorItems.bun._id : '';
    const orderIngridients: string[] = [
      bunId,
      ...constructorItems.ingredients.map(
        (ingridient: TConstructorIngredient) => ingridient._id
      ),
      bunId
    ];
    dispatch(orderBurger(orderIngridients));
  };
  // Закрыть модальное окно с идетификатором заказа
  const closeOrderModal = () => {
    dispatch(clearIngridients());
    dispatch(clearBurgerOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
