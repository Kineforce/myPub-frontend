import React, { useState } from "react";

import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ user: "", password: "" });
  const [error, setError] = useState({
    message: "",
  });

  function onChange(event) {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValidated = false;

    if (credentials.user === "") {
      setError({
        message: "Please, insert a valid username!",
      });
    } else if (credentials.password === "") {
      setError({
        message: "Please, insert a valid password!",
      });
    } else {
      setError({
        message: "",
      });
      isValidated = true;
    }

    if (isValidated === true) {
      console.log("Send fetch to API!");
    } else {
      console.log("Return error to user!");
    }
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
              name="user"
              value={credentials.user}
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
