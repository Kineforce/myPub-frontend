import { useState } from "react";
import api from "../../../api";

import "./RegisterClient.css";

const setNewClient = ({ clientData, setFeedbackMessage }) => {
  const data = api.post(`/api/clients/`, {
    name: clientData.name,
    cpf: clientData.cpf,
    gender: clientData.gender,
    phone_number: clientData.phone_number,
    adress: clientData.adress,
  });
  data.then(() => {
    setFeedbackMessage("Cliente cadastrado com sucesso!");
  });

  console.log("Posted data to backend!");
};

const RegisterClient = () => {
  const [clientData, setClientData] = useState({
    name: "",
    cpf: "",
    gender: "",
    phone_number: "",
    adress: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState("");

  function onChange(event) {
    const { name, value } = event.target;

    setClientData({
      ...clientData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    for (let i = 0; i < event.target.length; i++) {
      if (
        event.target[i].value === "" &&
        event.target[i].name !== "submit_btn" &&
        event.target[i].name !== "cpf" &&
        event.target[i].name !== "adress" &&
        event.target[i].name !== "gender"
      ) {
        setFeedbackMessage(
          `Por favor, fornecer o valor para o campo indicado!`
        );
        event.target[i].style.borderColor = "red";
        return;
      }

      event.target[i].style.borderColor = "blue";
    }

    setNewClient({ clientData, setFeedbackMessage });
  }

  return (
    <div className="inner_box_rc">
      {feedbackMessage && <span id="feedback_message">{feedbackMessage}</span>}

      <form id="register-client-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          name="name"
          value={clientData.name}
          onChange={onChange}
          placeholder="Insira o nome"
        />
        <input
          type="text"
          className="form-control"
          name="cpf"
          value={clientData.cpf}
          onChange={onChange}
          placeholder="Insira o CPF"
        />
        <input
          type="text"
          className="form-control"
          name="gender"
          value={clientData.gender}
          onChange={onChange}
          placeholder="Insira o gênero"
        />
        <input
          type="text"
          className="form-control"
          name="phone_number"
          value={clientData.phone_number}
          onChange={onChange}
          placeholder="Insira o telefone"
        />
        <input
          type="text"
          className="form-control"
          name="adress"
          value={clientData.adress}
          onChange={onChange}
          placeholder="Insira o endereço"
        />
        <input type="submit" name="submit_btn" value="Enviar" />
      </form>
    </div>
  );
};

export default RegisterClient;
