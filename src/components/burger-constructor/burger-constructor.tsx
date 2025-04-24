import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectorIngredients } from '../../services/slices/ingridientsSlice';
import {
  getSelectorConstructorBurger,
  addIngredient
} from '../../services/slices/burgerConstructorSlice';
import {
  getOrderData,
  getSelectorOrder,
  orderBurger
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getSelectorConstructorBurger);
  console.log('constructorItems: ', constructorItems);

  const dispatch = useDispatch();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const orderRequest = useSelector(getSelectorOrder);
  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
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
  const closeOrderModal = () => {
    // dispatch();
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
