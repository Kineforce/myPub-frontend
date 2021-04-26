import { useState } from "react";

import api from "../../../../../api";

const SaveActionField = ({ closeButton, feedbackMsg, handleValue }) => {
  return (
    <div className="inputBox">
      <form className="formAction" onSubmit={handleValue}>
        <div className="inputBox_methods">
          <button
            type="submit"
            className="fas fa-save saveActionField"
            title="Salvar ação"
          ></button>
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
        </div>
        <select className="actionField" type="text" name="action">
          <option value="Pagar">Pagou</option>
          <option value="Dever">Deveu</option>
        </select>
        <input
          className="priceField"
          type="text"
          placeholder="R$ 00.00"
          name="price"
        ></input>
        <input
          className="productField"
          type="text"
          name="product"
          placeholder="Produto"
        />
      </form>
    </div>
  );
};

const ActionField = ({ clientId, refreshActions }) => {
  const [showButton, setShowButton] = useState(false);

  const [feedbackMsg, setFeedbackMsg] = useState({
    feedbackMsg: "",
    color: "",
  });

  function showActionField() {
    setShowButton(true);
  }

  function handleValue(event) {
    event.preventDefault();

    let action = event.target.action.value;
    let price = event.target.price.value;
    let product = event.target.product.value;

    if (action === "" || price === "" || product === "") {
      setFeedbackMsg({
        feedbackMsg: "Please, fill all the fields!",
        color: "rgba(255, 0, 0, 0.76)",
      });
      return;
    }

    api
      .post(`/api/clients/addAction`, {
        client_id: clientId,
        action: action,
        price: price,
        product: product,
      })
      .then((response) => {
        setFeedbackMsg({
          feedbackMsg: "Action saved!",
          color: "rgb(204, 78, 204)",
        });

        refreshActions();
        setShowButton(false);
        setFeedbackMsg({});
        //setInputInfo("");
      })
      .catch((error) => {
        console.log("Something wrong happened!");
      });
  }

  function closeButton() {
    setFeedbackMsg({});
    setShowButton(false);
  }

  return (
    <div>
      {showButton && (
        <SaveActionField
          closeButton={closeButton}
          feedbackMsg={feedbackMsg}
          handleValue={handleValue}
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
