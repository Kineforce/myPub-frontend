import { useState, useEffect } from "react";

import api from "../../api";
import history from "../../history";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

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
            const token = response.data.token;
            localStorage.setItem("token", JSON.stringify(token));
            api.defaults.headers.Authorization = `Bearer ${token}`;
            history.push("/dashboard");
          }
          if (response.data.status === "401") {
            setError({
              message: "Usuário ou senha inválidos!",
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

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
