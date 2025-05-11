import ingredientsReducer, {
  initialState,
  fetchIngredientDetails
} from '../slices/ingridientsSlice';

describe('ingredientsSlice test', () => {
  it('fetchIngredientDetails.pending', () => {
    const nextState = ingredientsReducer(initialState, {
      type: fetchIngredientDetails.pending.type
    });
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('fetchIngredientDetails.fulfilled', () => {
    const payload = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 100,
        fat: 100,
        carbohydrates: 100,
        calories: 100,
        price: 100,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'sauce',
        proteins: 50,
        fat: 50,
        carbohydrates: 50,
        calories: 50,
        price: 50,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    ];

    const nextState = ingredientsReducer(initialState, {
      type: fetchIngredientDetails.fulfilled.type,
      payload
    });

    expect(nextState.loading).toBe(false);
    expect(nextState.ingredients).toEqual(payload);
  });

  it('fetchIngredientDetails.rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const action = {
      type: fetchIngredientDetails.rejected.type,
      error: { message: errorMessage }
    };

    const nextState = ingredientsReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });
});
