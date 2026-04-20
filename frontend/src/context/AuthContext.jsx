import { createContext, useCallback, useMemo, useState } from 'react';
import { clearStoredAuth, readStoredAuth, storeAuth } from '../api/http';
import { loginUser, registerUser } from '../api/authApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => readStoredAuth());

  const persistAuth = useCallback((nextAuth) => {
    storeAuth(nextAuth);
    setAuth(nextAuth);
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await loginUser(credentials);
    persistAuth({ token: response.token, user: response.user });
    return response;
  }, [persistAuth]);

  const register = useCallback(async (payload) => {
    const response = await registerUser(payload);
    persistAuth({ token: response.token, user: response.user });
    return response;
  }, [persistAuth]);

  const logout = useCallback(() => {
    clearStoredAuth();
    setAuth(null);
  }, []);

  const value = useMemo(() => ({
    token: auth?.token || null,
    user: auth?.user || null,
    isAuthenticated: Boolean(auth?.token),
    login,
    register,
    logout
  }), [auth, login, logout, register]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
