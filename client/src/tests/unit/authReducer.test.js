import authReducer from '../../store/reducers/authReducer';

describe('authReducer', () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };

  it('returns initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('handles AUTH_START action', () => {
    const action = { type: 'AUTH_START' };
    const state = authReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('handles AUTH_SUCCESS action', () => {
    const user = { id: 1, email: 'test@example.com' };
    const token = 'mock-token';
    const action = {
      type: 'AUTH_SUCCESS',
      payload: { user, token },
    };
    const state = authReducer(initialState, action);

    expect(state.user).toEqual(user);
    expect(state.token).toBe(token);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('handles AUTH_FAILURE action', () => {
    const error = 'Invalid credentials';
    const action = {
      type: 'AUTH_FAILURE',
      payload: error,
    };
    const state = authReducer(initialState, action);

    expect(state.user).toBe(null);
    expect(state.token).toBe(null);
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('handles AUTH_LOGOUT action', () => {
    const loggedInState = {
      user: { id: 1, email: 'test@example.com' },
      token: 'mock-token',
      isAuthenticated: true,
      loading: false,
      error: null,
    };
    const action = { type: 'AUTH_LOGOUT' };
    const state = authReducer(loggedInState, action);

    expect(state).toEqual(initialState);
  });

  it('handles CLEAR_ERROR action', () => {
    const errorState = {
      ...initialState,
      error: 'Some error',
    };
    const action = { type: 'CLEAR_ERROR' };
    const state = authReducer(errorState, action);

    expect(state.error).toBe(null);
  });

  it('handles unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});






