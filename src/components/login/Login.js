import React, { useState } from "react";
import "./Login.css";

function initialState() {
  return { user: "", password: "" };
}

const InterfaceLogin = () => {
  const [values, setValues] = useState(initialState);

  function onChange(event) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  return (
    <article id="article-login">
      <header id="header-login">myPub</header>
      <main id="main-login">
        <div id="interface-login__box-login">
          <form className="form-group">
            <input
              type="text"
              className="form-control"
              name="user"
              value={values.user}
              onChange={onChange}
              placeholder="username"
              required
            />
            <input
              type="password"
              className="form-control"
              name="password"
              value={values.password}
              onChange={onChange}
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
