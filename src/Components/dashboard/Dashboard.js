import { useContext, useState } from "react";
import { Context } from "../../Context/AuthContext";

import "./Dashboard.css";

// Sub components

import SearchClient from "./SearchClient/SearchClient";
import RegisterClient from "./RegisterClient/RegisterClient";
import Reporter from "./Reporter/Reporter";
import DeleteClient from "./DeleteClient/DeleteClient";

const Dashboard = () => {
  const { handleLogout } = useContext(Context);
  const [component, setComponent] = useState({
    curr_component: (
      <div className="generic_text">Welcome to myPub - Web Manager</div>
    ),
  });

  const searchClient = () => {
    setComponent({
      curr_component: <SearchClient setComponent={setComponent} />,
    });
  };

  const registerClient = () => {
    setComponent({
      curr_component: <RegisterClient setComponent={setComponent} />,
    });
  };

  const deleteClient = () => {
    setComponent({
      curr_component: <DeleteClient />,
    });
  };

  const listDebts = () => {
    setComponent({
      curr_component: <Reporter />,
    });
  };

  return (
    <article id="article-home">
      <header id="header-home">
        <h2>myPub</h2>
        <nav>
          <span onClick={searchClient}>Buscar cliente</span>
          <span onClick={registerClient}>Cadastrar cliente</span>
          <span onClick={deleteClient}>Excluir cliente</span>
          <span onClick={listDebts}>Relatório de economias</span>
          <span onClick={handleLogout}>Logout</span>
        </nav>
      </header>
      <main id="main-home">
        <div id="content-home">{component.curr_component}</div>
      </main>
      <footer id="footer-home">
        <h1>2021 - github.com/Kineforce</h1>
      </footer>
    </article>
  );
};

export default Dashboard;
