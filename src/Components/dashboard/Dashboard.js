import { useContext, useState } from "react";
import { Context } from "../../Context/AuthContext";

import "./Dashboard.css";

// Sub components

import SearchClient from "./SearchClient";
import RegisterClient from "./RegisterClient";
import ListDebts from "./ListDebts";
import ListProfits from "./ListProfits";
import DeleteClient from "./DeleteClient";

const Dashboard = () => {
  const { handleLogout } = useContext(Context);
  const [component, setComponent] = useState({
    curr_component: "Welcome to myPub - Web Manager",
  });

  const searchClient = () => {
    setComponent({
      curr_component: <SearchClient />,
    });
  };

  const registerClient = () => {
    setComponent({
      curr_component: <RegisterClient />,
    });
  };

  const deleteClient = () => {
    setComponent({
      curr_component: <DeleteClient />,
    });
  };

  const listDebts = () => {
    setComponent({
      curr_component: <ListDebts />,
    });
  };

  const listProfits = () => {
    setComponent({
      curr_component: <ListProfits />,
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
          <span onClick={listDebts}>Listar total de dívidas</span>
          <span onClick={listProfits}>Listar total de ganhos</span>
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
