import { useContext, useState, useEffect } from "react";
import { Context } from "../../Context/AuthContext";

import history from "../../history";

import "./Login.css";

const Login = () => {
  const { handleLogin } = useContext(Context);

  const [error, setError] = useState({
    message: "",
    pStyle: {
      color: "red",
    },
  });

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const query = window.location.href;
    if (query[query.length - 1] === "1") {
      setError({
        message: "Usuário registrado com sucesso!",
        pStyle: {
          "border-color": "green",
        },
      });
    }
  }, [setError]);

  function onChange(event) {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  function redirRegister() {
    history.push("/register");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (credentials.username === "") {
      setError({
        message: "Por favor, insira um usuário válido!",
      });
      return;
    }

    if (credentials.password === "") {
      setError({
        message: "Por favor, insira uma senha válida!",
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
            <span id="sign_in">
              Ainda não tem uma conta?
              <span id="link_sign_in" onClick={redirRegister}>
                Clique aqui!
              </span>
            </span>
            {error.message && (
              <span id="feedback_msg" style={error.pStyle}>
                {error.message}
              </span>
            )}
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
