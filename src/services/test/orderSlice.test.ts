import { TOrder } from '@utils-types';
import orderReducer, {
  initialState,
  fetchOrders,
  orderBurger,
  clearBurgerOrder
} from '../slices/orderSlice';

const payload = {
  order: {
    _id: '3',
    number: 789,
    ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
    name: 'New Order',
    status: 'pending',
    createdAt: '2025-05-11',
    updatedAt: '2025-05-11'
  } as TOrder
};

describe('orderSlice test', () => {
  it('fetchOrders.fulfilled', () => {
    const payload: TOrder[] = [
      {
        _id: '1',
        number: 123,
        ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
        name: 'Test Order',
        status: 'done',
        createdAt: '2025-05-11',
        updatedAt: '2025-05-11'
      },
      {
        _id: '2',
        number: 123,
        ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
        name: 'Test Order',
        status: 'done',
        createdAt: '2025-05-11',
        updatedAt: '2025-05-11'
      }
    ];

    const nextState = orderReducer(initialState, {
      type: fetchOrders.fulfilled.type,
      payload
    });

    expect(nextState.orders).toEqual(payload);
    expect(nextState.error).toBeNull();
  });

  it('fetchOrders.rejected', () => {
    const errorMessage = 'Не найдено, ошибка fetchOrders';
    const action = {
      type: fetchOrders.rejected.type,
      error: { message: errorMessage }
    };

    const nextState = orderReducer(initialState, action);

    expect(nextState.error).toBe(errorMessage);
    expect(nextState.orders).toEqual([]); // Проверяем, что orders не изменились
  });

  it('orderBurger.pending', () => {
    const nextState = orderReducer(initialState, {
      type: orderBurger.pending.type
    });

    expect(nextState.orderRequest).toBe(true);
    expect(nextState.order).toBeNull();
    expect(nextState.error).toBeNull();
  });

  it('orderBurger.fulfilled', () => {
    const nextState = orderReducer(initialState, {
      type: orderBurger.fulfilled.type,
      payload
    });

    expect(nextState.orderRequest).toBe(false);
    expect(nextState.order).toEqual(payload.order);
  });

  it('orderBurger.rejected', () => {
    const errorMessage = 'Не найдено, ошибка orderBurger';
    const action = {
      type: orderBurger.rejected.type,
      error: { message: errorMessage }
    };

    const nextState = orderReducer(initialState, action);

    expect(nextState.error).toBe(errorMessage);
    expect(nextState.orderRequest).toBe(false); // Проверяем, что orderRequest сброшен
    expect(nextState.order).toBeNull(); // Проверяем, что order сброшен
  });

  it('Очистить текущий заказ clearBurgerOrder', () => {
    const customInitialState = {
      ...initialState,
      payload
    };

    const nextState = orderReducer(customInitialState, clearBurgerOrder());
    expect(nextState.order).toBeNull();
  });
});
