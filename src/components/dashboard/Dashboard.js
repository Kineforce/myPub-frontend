import React from "react";
import "./Dashboard.css";

const Dashboard = ({ logout, token }) => {
  return (
    <article id="article-home">
      <header id="header-home">
        <h2>myPub</h2>
        <nav>
          <span>Buscar cliente</span>
          <span>Cadastrar cliente</span>
          <span>Listar total de dívidas</span>
          <span>Listar total de ganhos</span>
          <span onClick={logout}>{token}</span>
        </nav>
      </header>
      <main id="main-home">
        <div id="content-home"></div>
      </main>
      <footer id="footer-home">
        <h1>2021 - github.com/Kineforce</h1>
      </footer>
    </article>
  );
};

export default Dashboard;
