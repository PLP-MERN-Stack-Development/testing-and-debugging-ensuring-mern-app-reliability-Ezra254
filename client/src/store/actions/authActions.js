// Auth actions for Redux

export const authStart = () => ({
  type: 'AUTH_START',
});

export const authSuccess = (user, token) => ({
  type: 'AUTH_SUCCESS',
  payload: { user, token },
});

export const authFailure = (error) => ({
  type: 'AUTH_FAILURE',
  payload: error,
});

export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});

export const clearError = () => ({
  type: 'CLEAR_ERROR',
});

// Async action creators
export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      // This would typically make an API call
      // For testing purposes, we'll simulate it
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      dispatch(authSuccess(data.user, data.token));
      return data;
    } catch (error) {
      dispatch(authFailure(error.message));
      throw error;
    }
  };
};






