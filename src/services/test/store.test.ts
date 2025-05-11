import store from '../store';
import { initialState as user } from '../slices/userSlice';
import { initialState as ingredients } from '../slices/ingridientsSlice';
import { initialState as burgerСonstructor } from '../slices/burgerConstructorSlice';
import { initialState as feed } from '../slices/feedSlice';
import { initialState as order } from '../slices/orderSlice';
import { initialState as orderInfo } from '../slices/orderInfoSlice';

const initialState = {
  ingredients,
  burgerСonstructor,
  user,
  feed,
  order,
  orderInfo
};

describe('rootReducer test', () => {

  it('Проверяем правильную инициализацию', () => {
    const state = store.getState();
    expect(state).toEqual(initialState);
  });
});