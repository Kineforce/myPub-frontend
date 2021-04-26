import { useState } from "react";

import api from "../../../../../api";

const UpdateField = ({ actionId, setIsUpdate, refreshActions }) => {
  const [feedbackMsg, setFeedbackMsg] = useState({
    feedbackMsg: "",
    color: "",
  });

  function handleClose() {
    setFeedbackMsg({});
    setIsUpdate(false);
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
      .put(`/api/clients/updateAction/${actionId}`, {
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
        setFeedbackMsg({});
      })
      .catch((error) => {
        console.log(error);
        console.log("Something wrong happened!");
      });
  }

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
            onClick={() => handleClose()}
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

export default UpdateField;
