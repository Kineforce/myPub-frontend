import { useContext, useState } from "react";
import { Context } from "../../Context/AuthContext";

import "./Login.css";

const Login = () => {
  const { handleLogin } = useContext(Context);

  const [error, setError] = useState({
    message: "",
  });

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  //async function authUser(credentials) {}

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

    handleLogin({ credentials, setError });
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
