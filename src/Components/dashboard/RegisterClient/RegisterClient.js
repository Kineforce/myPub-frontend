import { useState } from "react";
import api from "../../../api";
import InputMask from "react-input-mask";

import "./RegisterClient.css";

const setNewClient = ({ clientData }) => {
  api.post(`/api/clients`, {
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
    feedback_color: "",
    grey: "#6c757d",
  });

  function onChange(event) {
    const { name, value } = event.target;

    if (name === "gender") {
      setColors({
        ...colors,
        grey: "white",
      });
    }

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
      event.target.form[i].classList.remove("placeholder_red");

      if (event.target.form[i].name === "gender") {
        event.target.form[i].style.color = "#6c757d";
      }
    }

    setColors({
      ...colors,
      grey: "#6c757d",
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    let canSubmit = true;

    let name = {
      path: "",
      validated: true,
    };
    let gender = {
      path: "",
      validated: true,
    };
    let phone_number = {
      path: "",
      validated: true,
    };

    for (let i = 0; i < event.target.length; i++) {
      let currInput = event.target[i];

      if (
        currInput.value === "" &&
        currInput.name !== "submit_btn" &&
        currInput.name !== "cpf" &&
        currInput.name !== "adress"
      ) {
        setFeedbackMessage(
          `Por favor, preencha corretamente os campos em vermelho`
        );

        if (currInput.name === "name") {
          name = {
            path: currInput,
            validated: false,
          };
        }

        if (currInput.name === "gender") {
          gender = {
            path: currInput,
            validated: false,
          };
        }

        if (currInput.name === "phone_number") {
          phone_number = {
            path: currInput,
            validated: false,
          };
        }

        canSubmit = false;
      }
    }

    if (name.validated === false) {
      name.path.classList.add("placeholder_red");
    }

    if (gender.validated === false) {
      gender.path.style.color = "#e4433d";
    }

    if (phone_number.validated === false) {
      phone_number.path.classList.add("placeholder_red");
    }

    console.clear();
    console.log(name);
    console.log(gender);
    console.log(phone_number);

    setColors({
      ...colors,
      feedback_color: "#e4433d",
    });

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
        <span>Nome</span>
        <input
          type="text"
          className="form-control"
          name="name"
          value={clientData.name}
          onChange={onChange}
          placeholder="Insira o nome"
        />
        <span>CPF</span>
        <InputMask
          type="text"
          className="form-control"
          mask="999.999.999-99"
          name="cpf"
          value={clientData.cpf}
          onChange={onChange}
          placeholder="Insira o CPF"
        />
        <span>Sexo</span>
        <select
          className="form-control"
          onChange={onChange}
          style={{
            color: colors.grey,
            textIndent: "0px",
          }}
          name="gender"
        >
          <option value="">Insira o Sexo</option>
          <option value="o" style={{ color: "white" }}>
            N??o informado
          </option>
          <option value="m" style={{ color: "white" }}>
            Masculino
          </option>
          <option value="f" style={{ color: "white" }}>
            Feminino
          </option>
        </select>
        <span>Telefone</span>
        <InputMask
          type="text"
          className="form-control"
          mask="(99) 9-9999-9999"
          name="phone_number"
          value={clientData.phone_number}
          onChange={onChange}
          placeholder="Insira o telefone"
        />
        <span>Endere??o</span>
        <input
          type="text"
          className="form-control"
          name="adress"
          value={clientData.adress}
          onChange={onChange}
          placeholder="Insira o endere??o"
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
