import { useState } from "react";
import api from "../../../api";
import InputMask from "react-input-mask";

import "./RegisterClient.css";

const setNewClient = ({ clientData }) => {
  api.post(`/api/clients/`, {
    name: clientData.name,
    cpf: clientData.cpf,
    gender: clientData.gender,
    phone_number: clientData.phone_number,
    adress: clientData.adress,
  });
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

  const [colors, setColors] = useState({
    red: "rgba(255, 0, 0, 0.411)",
    blue: "rgba(9, 78, 228, 0.514)",
    feedback_color: "#e4433d",
  });

  function onChange(event) {
    const { name, value } = event.target;

    setClientData({
      ...clientData,
      [name]: value,
    });
  }

  const cleanForm = (event) => {
    event.preventDefault();
    setClientData({
      name: "",
      cpf: "",
      gender: "",
      phone_number: "",
      adress: "",
    });

    setFeedbackMessage("");

    for (let i = 0; i < event.target.form.length; i++) {
      event.target.form[i].style.borderColor = "";
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    let canSubmit = true;

    for (let i = 0; i < event.target.length; i++) {
      if (
        event.target[i].value === "" &&
        event.target[i].name !== "submit_btn" &&
        event.target[i].name !== "cpf" &&
        event.target[i].name !== "adress" &&
        event.target[i].name !== "gender"
      ) {
        setFeedbackMessage(
          `Por favor, preencha corretamente os campos em vermelho`
        );
        setColors({
          feedback_color: "#e4433d",
        });
        event.target[i].classList.add("placeholder_red");
        canSubmit = false;
      }
    }

    if (canSubmit === true) {
      setFeedbackMessage("Cliente cadastrado com sucesso!");

      setColors({
        feedback_color: "#3de47d",
      });

      setNewClient({ clientData, setFeedbackMessage });
    }
  }

  return (
    <div className="inner_box_rc">
      {feedbackMessage && (
        <span
          id="feedback_message"
          style={{
            color: colors.feedback_color,
            borderColor: colors.feedback_color,
          }}
        >
          {feedbackMessage}
        </span>
      )}

      <form id="register-client-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          name="name"
          value={clientData.name}
          onChange={onChange}
          placeholder="Insira o nome"
        />
        <InputMask
          type="text"
          className="form-control"
          mask="999.999.999-99"
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
        <InputMask
          type="text"
          className="form-control"
          mask="(99) 9-9999-9999"
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
        <div id="submit_row">
          <input type="submit" name="submit_btn" value="Enviar" />
          <input
            type="submit"
            name="submit_btn"
            onClick={cleanForm}
            value="Limpar"
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterClient;
