import axios from 'axios';

/**
 * Axios instance configured for the MERN API.
 * - Leverages the CRA proxy (see client/package.json) when running locally.
 * - Automatically attaches JWT tokens when available.
 */
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Inject the Authorization header if a token is provided.
 */
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

export default apiClient;

