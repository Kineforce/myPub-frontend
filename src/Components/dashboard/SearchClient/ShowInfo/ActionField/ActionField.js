import { useState } from "react";

import api from "../../../../../api";

const SaveActionField = ({
  checkEmpty,
  closeButton,
  feedbackMsg,
  inputInfo,
  handleValue,
}) => {
  return (
    <div>
      <i
        className="fas fa-save saveActionField"
        onClick={() => checkEmpty()}
        title="Salvar ação"
      ></i>
      <i
        className="fas fa-times saveActionField"
        onClick={() => closeButton()}
        title="Cancelar inserção"
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

const ActionField = ({ clientId, refreshActions }) => {
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
    setFeedbackMsg({});
    setInputInfo("");
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

    api
      .post(`/api/clients/addAction`, {
        client_id: clientId,
        action: inputInfo,
      })
      .then((response) => {
        setFeedbackMsg({
          feedbackMsg: "Action saved!",
          color: "rgb(204, 78, 204)",
        });

        refreshActions();
        setShowButton(false);
        setFeedbackMsg({});
        setInputInfo("");
      })
      .catch((error) => {
        console.log("Something wrong happened!");
      });
  }

  return (
    <div>
      {showButton && (
        <SaveActionField
          checkEmpty={checkEmpty}
          closeButton={closeButton}
          feedbackMsg={feedbackMsg}
          inputInfo={inputInfo}
          handleValue={handleValue}
          clientId={clientId}
        />
      )}

      <button
        className="btnHist"
        type="submit"
        title="Adicionar nova ação"
        onClick={showActionField}
      >
        +
      </button>
    </div>
  );
};

export default ActionField;
