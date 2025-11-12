import apiClient from './apiClient';

/**
 * Register a new user.
 */
export const registerUser = (payload) => {
  return apiClient.post('/auth/register', payload).then((res) => res.data);
};

/**
 * Login existing user.
 */
export const loginUser = (payload) => {
  return apiClient.post('/auth/login', payload).then((res) => res.data);
};

/**
 * Fetch the currently authenticated user.
 */
export const fetchCurrentUser = () => {
  return apiClient.get('/auth/me').then((res) => res.data);
};

