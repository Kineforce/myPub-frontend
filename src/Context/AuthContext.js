import React, { createContext } from "react";

import useAuth from "./hooks/useAuth";

const Context = createContext();

function AuthProvider({ children }) {
  const {
    loading,
    authenticated,
    handleRegister,
    handleLogin,
    handleLogout,
  } = useAuth();

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
