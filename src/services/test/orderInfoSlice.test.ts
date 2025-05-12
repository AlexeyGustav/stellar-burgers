import { TOrder } from '@utils-types';
import orderInfoReducer, {
  initialState,
  getOrderByNumber
} from '../slices/orderInfoSlice';

describe('orderInfoSlice test', () => {
  it('getOrderByNumber.pending', () => {
    const nextState = orderInfoReducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    console.log('nextState: ', nextState);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull(); // проверяем поле на null
    expect(nextState.order).toBeNull();
  });

  it('getOrderByNumber.fulfilled', () => {
    const payload = {
      orders: [
        {
          _id: '1',
          number: 123,
          ingredients: [],
          name: 'Order 1',
          status: 'done',
          createdAt: '2025-05-11',
          updatedAt: '2025-05-11'
        } as TOrder
      ]
    };

    const nextState = orderInfoReducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload
    });

    expect(nextState.loading).toBe(false);
    expect(nextState.order).toEqual(payload.orders[0]);
    expect(nextState.error).toBeNull();
  });

  it('getOrderByNumber.rejected', () => {
    const errorMessage = 'Не найдено, ошибка getOrderByNumber';
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };

    const nextState = orderInfoReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
    expect(nextState.order).toBeNull();
  });
});
