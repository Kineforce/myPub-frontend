import { useState, useEffect } from "react";

import "./ShowInfo.css";
import api from "../../../../api";

const ActionField = () => {
  const [inputInfo, setInputInfo] = useState("");
  const [showButton, setShowButton] = useState(false);

  const [feedbackMsg, setFeedbackMsg] = useState({
    feedbackMsg: "",
    color: "",
  });

  function showActionField() {
    setShowButton(true);
  }

  function handleValue(event) {
    setInputInfo(event.target.value);
  }

  function closeButton() {
    setShowButton(false);
  }

  function checkEmpty() {
    if (inputInfo === "") {
      setFeedbackMsg({
        feedbackMsg: "Please, insert some action!",
        color: "rgba(255, 0, 0, 0.76)",
      });
      return;
    }

    setFeedbackMsg({
      feedbackMsg: "Action saved!",
      color: "rgb(204, 78, 204)",
    });
  }

  const SaveActionField = () => {
    return (
      <div>
        <i
          className="fas fa-save saveActionField"
          onClick={() => checkEmpty()}
        ></i>
        <i
          className="fas fa-times saveActionField"
          onClick={() => closeButton()}
        ></i>
        {feedbackMsg.feedbackMsg && (
          <span className="saveFeedback" style={{ color: feedbackMsg.color }}>
            {feedbackMsg.feedbackMsg}
          </span>
        )}
        <input
          className="actionField"
          type="text"
          value={inputInfo}
          onChange={handleValue}
        />
      </div>
    );
  };

  return (
    <div>
      {showButton && <SaveActionField />}
      <button
        className="btnHist"
        type="submit"
        title="Adicionar novo item"
        onClick={showActionField}
      >
        +
      </button>
    </div>
  );
};

const ShowInfo = (props) => {
  const [actions, setActions] = useState([]);
  let client_id = props.props.client.id;

  useEffect(() => {
    api.get(`api/clients/addAction/` + client_id).then((response) => {
      setActions(response.data);
    });
  }, [client_id]);

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
          <div className="actionDataInfo">
            {actions.map((action) => {
              return (
                <span key={action.id} className="action">
                  {action.action}
                </span>
              );
            })}
            <div className="dataClientActions">
              <ActionField />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
