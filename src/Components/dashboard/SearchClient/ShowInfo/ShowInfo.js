import { useState } from "react";

import "./ShowInfo.css";

const ActionField = () => {
  return (
    <div>
      <input className="actionField" type="text" />
      <input className="actionField" type="text" />
      <input className="actionField" type="text" />
      <input className="actionField" type="text" />
    </div>
  );
};

const ShowInfo = (props) => {
  const [showButton, setShowButton] = useState(false);

  function insertAction() {
    setShowButton(true);

    console.log(showButton);
    console.log("Send to API to insert action!");
  }

  function getActions() {
    console.log("Send to API to get actions!");
  }

  return (
    <>
      <div className="showInfoDiv">
        <div className="basicInfo">
          <div className="titleBasicInfo">Informações do cliente</div>
          <div className="dataBasicInfo">
            <span className="subTitlesDataBasicInfo">Nome</span>
            <span className="itemDataBasicInfo">{props.props.client.name}</span>
            <span className="subTitlesDataBasicInfo">CPF</span>
            <span className="itemDataBasicInfo">{props.props.client.cpf}</span>
            <span className="subTitlesDataBasicInfo">Sexo</span>
            <span className="itemDataBasicInfo">
              {props.props.client.gender === "f" ? "Feminino" : "Masculino"}
            </span>
            <span className="subTitlesDataBasicInfo">Telefone</span>
            <span className="itemDataBasicInfo">
              {props.props.client.phone_number}
            </span>
            <span className="subTitlesDataBasicInfo">Endereço</span>
            <span className="itemDataBasicInfo">
              {props.props.client.adress}
            </span>
          </div>
        </div>
        <div className="clientActions">
          <div className="titleClientActions">Histórico do cliente</div>
          <div className="dataClientActions">
            {showButton === true && <ActionField />}
            <button
              className="btnHist"
              type="submit"
              title="Adicionar novo item"
              onClick={insertAction}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
