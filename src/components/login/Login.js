import React, { useState } from "react";
import "./Login.css";
import apiClient from "../../services/api";

const Login = ({ manageLogin }) => {
  const [error, setError] = useState({
    message: "",
  });

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  async function authUser(credentials) {
    apiClient.get("/sanctum/csrf-cookie").then((response) => {
      apiClient
        .post("/api/login", {
          username: credentials.username,
          password: credentials.password,
          password_confirmation: credentials.password,
        })
        .then((response) => {
          if (response.data.status === "201") {
            console.log("Authenticated! Set token now!");
            console.log("Authenticated! Redirect to dashboard!");
            manageLogin(response.data.token);
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

  function onChange(event) {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (credentials.username === "") {
      setError({
        message: "Please, insert a valid username!",
      });
      return;
    }

    if (credentials.password === "") {
      setError({
        message: "Please, insert a valid password!",
      });
      return;
    }

    authUser(credentials);
  };

  return (
    <article id="article-login">
      <header id="header-login">myPub</header>
      <main id="main-login">
        <div id="interface-login__box-login">
          <form className="form-group" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              name="username"
              value={credentials.username}
              onChange={onChange}
              placeholder="username"
            />
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="password"
            />
            <input type="submit" className="btn btn-primary" value="Login" />
            <span id="feedback_msg">{error.message}</span>
          </form>
        </div>
      </main>
      <footer id="footer-login">
        <h1>2021 - github.com/Kineforce</h1>
      </footer>
    </article>
  );
};

export default Login;
