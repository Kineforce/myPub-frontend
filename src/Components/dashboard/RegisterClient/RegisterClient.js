import { useState } from "react";
import api from "../../../api";

import "./RegisterClient.css";

const setNewClient = (clientData) => {
  const data = api.post(`/api/clients/`, {
    name: clientData.name,
    cpf: clientData.cpf,
    gender: clientData.gender,
    phone_number: clientData.phone_number,
    adress: clientData.adress,
  });
  data.then((response) => {});

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
        event.target[i].name !== "submit_btn"
      ) {
        setFeedbackMessage(
          `Fornecer valor para o campo ${event.target[i].name}`
        );
        return;
      }
    }

    // event.target.map((value) => {
    //   return console.log(value.name);
    // });
    //setNewClient(clientData);
  }

  return (
    <div className="inner_box_rc">
      {feedbackMessage && <span id="feedback_msg">{feedbackMessage}</span>}

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
        <input type="submit" name="submit_btn" placeholder="Value" />
      </form>
    </div>
  );
};

export default RegisterClient;
