import React, { createContext, useContext, useState } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext();
const authService = new AuthService();

export const AuthProvider = ({ value, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.loggedIn());
  const login = (email, password) => {
    return authService
      .login(email, password)
      .then(() => setIsLoggedIn(authService.loggedIn()));
  };
  const auth = {
    login,
    // loggedIn: () => authService.loggedIn(),
    logout: () => authService.logout()
  };
  return (
    <AuthContext.Provider
      value={{
        user: () => authService.getProfile(),
        isLoggedIn,
        auth
      }}
      {...rest}
    />
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
