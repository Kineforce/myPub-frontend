import { useContext, useState } from "react";
import { Context } from "../../Context/AuthContext";

import "./Register.css";

const Register = () => {
  const { handleRegister } = useContext(Context);

  const [error, setError] = useState({
    message: "",
  });

  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
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

    if (credentials.email === "") {
      setError({
        message: "Por favor, insira um email válido!",
      });
      return;
    }

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

    if (credentials.password !== credentials.password_confirmation) {
      setError({
        message: "Por favor, verifique se as senhas coincidem!",
      });
      return;
    }

    handleRegister({ credentials, setError });
  };

  return (
    <article id="article-register">
      <header id="header-register">myPub</header>
      <main id="main-register">
        <div id="interface-register__box-register">
          <form className="form-group" onSubmit={handleSubmit}>
            {error.message && (
              <span id="feedback_msg">
                <span>{error.message}</span>
              </span>
            )}
            <input
              type="text"
              className="form-control"
              name="email"
              value={credentials.emails}
              onChange={onChange}
              placeholder="Email"
            />
            <input
              type="text"
              className="form-control"
              name="username"
              value={credentials.username}
              onChange={onChange}
              placeholder="Usuário"
            />
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Senha"
            />
            <input
              type="password"
              className="form-control"
              name="password_confirmation"
              value={credentials.password_confirmation}
              onChange={onChange}
              placeholder="Confirmação de senha"
            />
            <input
              type="submit"
              className="btn btn-primary"
              value="Registrar"
            />
            <span id="already_signin">
              Clique <span id="redir_login">aqui</span> para ir a tela de login
            </span>
          </form>
        </div>
      </main>
      <footer id="footer-register">
        <h1>2021 - github.com/Kineforce</h1>
      </footer>
    </article>
  );
};

export default Register;
