import React, { createContext, useState } from "react";
import api from "../api";
import history from "../history";

const Context = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  async function handleLogin({ credentials, setError }) {
    api.get("/sanctum/csrf-cookie").then((response) => {
      api
        .post("/api/login", {
          username: credentials.username,
          password: credentials.password,
          password_confirmation: credentials.password,
        })
        .then((response) => {
          if (response.data.status === "201") {
            setAuthenticated(true);
            history.push("/dashboard");
          }
          if (response.data.status === "401") {
            setError({
              message: response.data.message,
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    });
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };
