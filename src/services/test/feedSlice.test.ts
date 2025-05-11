import feedReducer, {
  initialState,
  fetchFeed
} from '../slices/feedSlice';

describe('feedSlice test', () => {
  it('должен обрабатывать fetchFeed.pending', () => {
    const nextState = feedReducer(initialState, { type: fetchFeed.pending.type });

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('должен обрабатывать fetchFeed.fulfilled', () => {
    const payload = {
      orders: [
        { _id: '1', number: 123, ingredients: [], name: 'Order 1', status: 'done', createdAt: '', updatedAt: '' },
        { _id: '2', number: 456, ingredients: [], name: 'Order 2', status: 'pending', createdAt: '2025-05-11', updatedAt: '2025-05-11' },
      ],
      total: 7777,
      totalToday: 100,
    };

    const nextState = feedReducer(initialState, { type: fetchFeed.fulfilled.type, payload });

    expect(nextState.loading).toBe(false);
    expect(nextState.orders).toEqual(payload.orders);
    expect(nextState.total).toBe(payload.total);
    expect(nextState.totalToday).toBe(payload.totalToday);
  });

  it('должен обрабатывать fetchFeed.rejected', () => {
    const errorMessage = 'Failed to fetch data';
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: errorMessage },
    };

    const nextState = feedReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });
});