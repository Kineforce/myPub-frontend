import { useState, useEffect } from "react";
import api from "../../../api";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "./DeleteClient.css";

const fetchUsers = ({ curr_search, setClients, setCounterResults }) => {
  if (curr_search.trim() === "") {
    setClients([]);
    setCounterResults(0);
    return;
  }

  const data = api.get(`/api/clients/search/${curr_search}`);
  data.then((response) => {
    setClients(response.data);
    setCounterResults(response.data.length);
  });
};

const fetchAll = ({ setClients, setCounterResults }) => {
  const data = api.get(`/api/clients/all`);
  data.then((response) => {
    setClients(response.data);
    setCounterResults(response.data.length);
  });
};

const removeClient = ({ event, counterResults, setCounterResults }) => {
  const client_id = event.target.attributes[0].value;

  event.target.classList.add("animation_remove");
  setTimeout(() => {
    event.target.setAttribute("hidden", "true");
    setCounterResults(counterResults - 1);
  }, 500);

  api.delete(`/api/clients/${client_id}`).then((response) => {});
};

const DeleteClient = () => {
  const [searchName, setSearchName] = useState("");
  const [clients, setClients] = useState([]);
  const [counterResults, setCounterResults] = useState(0);

  function handleValue(event) {
    let curr_search = event.target.value;
    curr_search = curr_search.replace(/[^a-zA-Z. ]/gi, "");

    setSearchName(curr_search);
    fetchUsers({ curr_search, setClients, setCounterResults });
  }

  function fetchAllUsers() {
    fetchAll({ setClients, setCounterResults });
  }

  const handleDelete = (event) => {
    confirmAlert({
      title: `Deletar ${event.target.innerText}?`,
      message: `Confirme a ação`,
      buttons: [
        {
          label: "Sim",
          onClick: () =>
            removeClient({ event, counterResults, setCounterResults }),
        },
        {
          label: "Não",
          onClick: () => {
            console.log("Ação cancelada!");
          },
        },
      ],
      overlayClassName: "overlay_delete",
    });
  };

  useEffect(() => {
    document
      .getElementsByClassName("inner_box_delete")[0]
      .setAttribute("hidden", "true");

    const data = api.get(`/api/clients/all`);
    data
      .then((response) => {
        setClients(response.data);
        setCounterResults(response.data.length);
      })
      .then(() => {
        document
          .getElementsByClassName("loader")[0]
          .setAttribute("hidden", "true");
        document
          .getElementsByClassName("inner_box_delete")[0]
          .removeAttribute("hidden");
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="loader"></div>
        <div className="inner_box_delete" hidden>
          <div className="up-side_delete">
            <div className="input-row_delete">
              <input
                type="text"
                value={searchName}
                onChange={handleValue}
                placeholder="Buscar por nome..."
              ></input>
              <button
                style={{ marginLeft: "10px" }}
                type="submit"
                id="buttonAll"
                onClick={fetchAllUsers}
              >
                {" "}
                Buscar tudo
              </button>
              <span id="counterResults_delete">
                Quantidade de resultados: <span>{counterResults}</span>
              </span>
            </div>
          </div>
          <div className="down-side_delete">
            {clients.map((client, index) => {
              return (
                <div
                  key={index}
                  client_id={client.id}
                  className="client-row_delete"
                  onClick={handleDelete}
                >
                  {client.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteClient;
