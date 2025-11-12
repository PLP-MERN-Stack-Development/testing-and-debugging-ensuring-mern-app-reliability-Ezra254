import {
  authStart,
  authSuccess,
  authFailure,
  authLogout,
  clearError,
} from '../../store/actions/authActions';

describe('auth actions', () => {
  describe('synchronous actions', () => {
    it('creates AUTH_START action', () => {
      expect(authStart()).toEqual({ type: 'AUTH_START' });
    });

    it('creates AUTH_SUCCESS action', () => {
      const user = { id: 1, email: 'test@example.com' };
      const token = 'mock-token';
      expect(authSuccess(user, token)).toEqual({
        type: 'AUTH_SUCCESS',
        payload: { user, token },
      });
    });

    it('creates AUTH_FAILURE action', () => {
      const error = 'Invalid credentials';
      expect(authFailure(error)).toEqual({
        type: 'AUTH_FAILURE',
        payload: error,
      });
    });

    it('creates AUTH_LOGOUT action', () => {
      expect(authLogout()).toEqual({ type: 'AUTH_LOGOUT' });
    });

    it('creates CLEAR_ERROR action', () => {
      expect(clearError()).toEqual({ type: 'CLEAR_ERROR' });
    });
  });

  describe('async actions', () => {
    // Note: Testing async thunks typically requires more setup
    // This is a basic example - in a real app you'd use redux-mock-store
    it('login action creator exists', () => {
      const loginAction = require('../../store/actions/authActions').login;
      expect(typeof loginAction).toBe('function');
    });
  });
});






