import React, { useState } from "react";
import "./Login.css";

const InterfaceLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  return (
    <article id="article-login">
      <header id="header-login">myPub</header>
      <main id="main-login">
        <div id="interface-login__box-login">
          <form className="form-group">
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={handleUsername}
              placeholder="username"
              required
            />
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handlePassword}
              placeholder="password"
              required
            />
            <input type="submit" className="btn btn-primary" value="Login" />
            <span id="feedback_msg"></span>
          </form>
        </div>
      </main>
      <footer id="footer-login">
        <h1>2021 - github.com/Kineforce</h1>
      </footer>
    </article>
  );
};

export default InterfaceLogin;
