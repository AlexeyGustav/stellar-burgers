import { omit } from 'lodash';

import burgerConstructorReducer, {
  initialState,
  addIngredient,
  removeIngredient,
  handleMove
} from '../slices/burgerConstructorSlice';

describe('burgerConstructor test', () => {
  const mockIngredientBun = {
    _id: '643d69a5c3f7b9001cfa093c',
    id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockIngredientMain = {
    _id: '643d69a5c3f7b9001cfa093e',
    id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const mockIngredientMain2 = {
    _id: '643d69a5c3f7b9001cfa093f',
    id: '643d69a5c3f7b9001cfa093f',
    name: 'Филе Люминесцентного тетраодонтимформа 2',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  it('добавление ингридиента', () => {
    const bunAction = addIngredient(mockIngredientBun);
    const bunState = burgerConstructorReducer(initialState, bunAction);

    expect(bunState.bun).toEqual(
      expect.objectContaining(omit(mockIngredientBun, 'id'))
    );
    expect(bunState.ingredients).toEqual([]);

    const mainAction = addIngredient(mockIngredientMain);
    const mainState = burgerConstructorReducer(bunState, mainAction);

    expect(mainState.bun).toEqual(
      expect.objectContaining(omit(mockIngredientBun, 'id'))
    );
    expect(mainState.ingredients).toHaveLength(1);
    expect(mainState.ingredients[0]).toEqual(
      expect.objectContaining(omit(mockIngredientMain, 'id'))
    );
    expect(mainState.ingredients[0]).toHaveProperty('id');
  });

  it('удаление ингридиента', () => {
    // добавляем ингридиент
    const bunAction = addIngredient(mockIngredientBun);
    const bunState = burgerConstructorReducer(initialState, bunAction);

    // Добавление начинки
    const mainAction = addIngredient(mockIngredientMain);
    const mainState = burgerConstructorReducer(bunState, mainAction);

    // Получение id
    const ingredientId = mainState.ingredients[0].id;

    // Удаление основного ингредиента
    const removeAction = removeIngredient(ingredientId);
    const removeState = burgerConstructorReducer(mainState, removeAction);

    // Утверждения
    expect(removeState.bun).toEqual(
      expect.objectContaining(omit(mockIngredientBun, 'id'))
    );
    expect(removeState.ingredients).toHaveLength(0);
  });

  it('изменение порядка ингредиентов в начинке (handleMove)', () => {
    // добавляем 2 начинки
    const addAction1 = addIngredient(mockIngredientMain);
    const state1 = burgerConstructorReducer(initialState, addAction1);

    const addAction2 = addIngredient(mockIngredientMain2);
    const state2 = burgerConstructorReducer(state1, addAction2);

    // получаем id
    const ingredient1Id = state2.ingredients[0].id;
    const ingredient2Id = state2.ingredients[1].id;

    // получаем ожидаемое состояние после перемещения
    const sortedIngredients = [
      { ...omit(mockIngredientMain2, 'id'), id: ingredient2Id },
      { ...omit(mockIngredientMain, 'id'), id: ingredient1Id }
    ];

    const fromIndex = 0;
    const toIndex = 1;
    const moveAction = handleMove({ fromIndex, toIndex });
    const movedState = burgerConstructorReducer(state2, moveAction);
    expect(movedState.ingredients).toEqual(sortedIngredients);
  });
});
