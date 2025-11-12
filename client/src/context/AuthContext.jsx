import React, { createContext, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { loginUser, registerUser, fetchCurrentUser } from '../services/authService';
import { setAuthToken } from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useLocalStorage('mern-auth', {
    user: null,
    token: null,
  });

  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials);
    setAuthState({
      user: data.user,
      token: data.token,
    });
    return data;
  }, [setAuthState]);

  const register = useCallback(async (payload) => {
    const data = await registerUser(payload);
    setAuthState({
      user: data.user,
      token: data.token,
    });
    return data;
  }, [setAuthState]);

  const logout = useCallback(() => {
    setAuthState({ user: null, token: null });
  }, [setAuthState]);

  useEffect(() => {
    setAuthToken(authState?.token);
  }, [authState?.token]);

  useEffect(() => {
    if (authState?.token && !authState?.user) {
      fetchCurrentUser()
        .then((data) => {
          setAuthState((prev) => ({
            ...prev,
            user: data.user,
          }));
        })
        .catch(() => {
          logout();
        });
    }
  }, [authState?.token, authState?.user, logout, setAuthState]);

  const refreshSession = useCallback(async () => {
    if (!authState?.token) return null;
    try {
      const data = await fetchCurrentUser();
      setAuthState((prev) => ({
        ...prev,
        user: data.user,
      }));
      return data;
    } catch (error) {
      logout();
      return null;
    }
  }, [authState?.token, logout, setAuthState]);

  return (
    <AuthContext.Provider
      value={{
        user: authState?.user,
        token: authState?.token,
        login,
        register,
        logout,
        refreshSession,
        isAuthenticated: Boolean(authState?.token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

