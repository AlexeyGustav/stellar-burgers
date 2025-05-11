import userReducer, {
  initialState,
  getUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser
} from '../slices/userSlice';

describe('userSlice test', () => {
  // Pending tests
  function pendingAction(action: any) {
    const newState = userReducer(initialState, action.pending(''));
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.isAuthenticated).toBe(false);
  }

  it('getUser.pending', () => {
    pendingAction(getUser);
  });

  it('registerUser.pending', () => {
    pendingAction(registerUser);
  });

  it('loginUser.pending', () => {
    pendingAction(loginUser);
  });

  it('updateUser.pending', () => {
    pendingAction(updateUser);
  });

  it('logoutUser.pending', () => {
    pendingAction(logoutUser);
  });

  // Fulfilled tests
  const user = {
    email: "gustavaleksej9@gmail.com",
    name: "sdasd"
  };

  const userResponse = {
    success: true,
    user: user
  };

  const loginData = {
    email: 'gustavaleksej9@gmail.com',
    password: '123456789'
  };

  const authResponse = {
    success: true,
    accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTc5ODAwZThlNjFkMDAxY2VjNWZlYyIsImlhdCI6MTc0Njk5MjMzMiwiZXhwIjoxNzQ2OTkzNTMyfQ.EiOlJz3YVAqy5A8uUKYZ4k0H3o_1UdZhxq9wOvSOFXk",
    refreshToken: "123db0813609ac8ced77c06ec98aec8a697d3c7874960368b7f970c89646da7ba57aed1f2a126744",
    user: user
  };

  function fulfilledAction(newState: any, action: any) {
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
  }

  it('getUser.fulfilled', () => {
    const newState = userReducer(
      initialState,
      getUser.fulfilled(userResponse, '')
    );

    expect(newState.user).toEqual(userResponse.user);
    fulfilledAction(newState, getUser);
  });

  it('loginUser.fulfilled', () => {
    const newState = userReducer(
      initialState,
      loginUser.fulfilled(authResponse, '', loginData)
    );

    expect(newState.user).toEqual(authResponse.user);
    fulfilledAction(newState, loginUser);
  });

  it('updateUser.fulfilled', () => {
    const newState = userReducer(
      initialState,
      updateUser.fulfilled(authResponse, '', loginData)
    );

    expect(newState.user).toEqual(authResponse.user);
    fulfilledAction(newState, updateUser);
  });

  it('logoutUser.fulfilled', () => {
    const payload: { success: boolean } = { success: true };

    const customInitialState = {
      ...initialState,
      user,
      isAuthenticated: true,
      isAuthChecked: true,
    };
    const nextState = userReducer(customInitialState, {
      type: logoutUser.fulfilled.type,
      payload,
    });

    expect(nextState.user).toBeNull();
    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.isAuthChecked).toBe(true);
  });

  // Rejected tests
  const error = new Error('error massage');

  function rejectedAction(action: any) {
    const newState = userReducer(initialState, action.rejected(error, ''));
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(error.message);
  }

  it('getUser.rejected', () => {
    rejectedAction(getUser);
  });

  it('registerUser.rejected', () => {
    rejectedAction(registerUser);
  });

  it('loginUser.rejected', () => {
    rejectedAction(loginUser);
  });

  it('updateUser.rejected', () => {
    rejectedAction(updateUser);
  });

  it('logoutUser.rejected', () => {
    rejectedAction(logoutUser);
  });
});
