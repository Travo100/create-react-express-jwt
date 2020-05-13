import React, { createContext, useContext, useState } from "react";
import AuthService from "./AuthService";

const AuthContext = createContext();
const authService = new AuthService();

// Provides user (object || null), isLoggedIn (bool), login(): promise,
// and logout(): void
export const AuthProvider = ({ value, ...rest }) => {
  const isLoggedIn = authService.loggedIn();
  const [user, setUser] = useState(
    isLoggedIn ? authService.getProfile() : null
  );

  const login = (email, password) => {
    return authService
      .login(email, password)
      .then(() => setUser(authService.getProfile()));
  };

  const logout = () => authService.logout();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout
      }}
      {...rest}
    />
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
