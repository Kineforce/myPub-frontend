import { useState, useEffect, useRef } from "react";
import api from "../../../api";
import debounce from "lodash.debounce";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "./DeleteClient.css";

const removeClient = ({
  event,
  clients,
  setClients,
  setTempClients,
  tempClients,
}) => {
  const client_id = event.target.attributes[0].value;
  let new_arr = [];

  event.target.classList.add("animation_remove");

  setTimeout(() => {
    event.target.setAttribute("hidden", "true");

    clients.forEach((client) => {
      if (client_id.toString() !== client.id.toString()) {
        new_arr.push(client);
      }
    });

    setClients(new_arr);
  }, 500);

  api.delete(`/api/clients/${client_id}`).then((response) => {});
};

const DeleteClient = () => {
  const [searchName, setSearchName] = useState("");
  const [clients, setClients] = useState([]);
  const [tempClients, setTempClients] = useState([]);
  const [disabled, setDisabled] = useState({
    left: true,
    right: false,
    color: "black",
  });
  const [loadingDisable, setLoadingDisable] = useState({
    loader: "none",
    inner_box: "none",
  });
  const [pageIndex, setPageIndex] = useState(1);
  const [start, setStart] = useState(0);
  const [counterResults, setCounterResults] = useState(0);
  const resultPerPage = 12;
  let counterResultsPerPage = 0;

  // Funções para avançar, retroceder, ir para última e primeira página
  function goFirst() {
    setPageIndex(1);
    setStart(0);
    setDisabled({ left: true });
  }

  function goLast() {
    let clients_len = tempClients.length;
    let iterator = 0;

    while (clients_len > resultPerPage) {
      iterator = iterator + 1;
      clients_len = clients_len - resultPerPage;
    }

    let lastItemLastPage = tempClients.length - clients_len;

    setDisabled({
      right: true,
      left: false,
    });

    setPageIndex(Math.ceil(counterResults / 12));
    setStart(lastItemLastPage);
  }

  function goFoward(e) {
    setTempClients(clients);

    if (counterResultsPerPage === resultPerPage) {
      setPageIndex(pageIndex + 1);
      setStart(start + resultPerPage);
      setDisabled({ left: false });
    } else {
      setDisabled({ right: true });
    }

    let clients_len = tempClients.length;
    let iterator = 0;

    while (clients_len > resultPerPage) {
      iterator = iterator + 1;
      clients_len = clients_len - resultPerPage;
    }

    if (pageIndex === iterator) {
      setDisabled({ right: true });
    }
  }

  function goBack(e) {
    setTempClients(clients);

    if (start !== 0) {
      setPageIndex(pageIndex - 1);
      setStart(start - resultPerPage);
      setDisabled({ right: false });
    } else {
      setDisabled({ left: true });
    }

    if (pageIndex === 1 || start === 12) {
      setDisabled({ left: true });
    }
  }

  // Executa a ultima chamada da função
  const debouncedSave = useRef(
    debounce((curr_search, arr_clients) => {
      var new_arr = [];
      var search_counter = 0;

      arr_clients.forEach((arr_client) => {
        if (arr_client.name.toUpperCase().includes(curr_search.toUpperCase())) {
          new_arr.push(arr_client);
          search_counter = search_counter + 1;
        }
      });

      if (search_counter <= 12) {
        setDisabled({
          left: true,
          right: true,
        });
      } else {
        setDisabled({
          left: false,
          right: false,
        });
      }

      setStart(0);
      counterResultsPerPage = 0;
      setPageIndex(1);
      setCounterResults(search_counter);
      setTempClients(new_arr);
    }, 500)
  ).current;

  function handleValue(event) {
    let curr_search = event.target.value;
    curr_search = curr_search.replace(/[^a-zA-Z.0-9 ]/gi, "");

    setSearchName(curr_search);
    debouncedSave(curr_search, clients);
  }

  const handleDelete = (event) => {
    confirmAlert({
      title: `Deletar ${event.target.innerText}?`,
      message: `Confirme a ação`,
      buttons: [
        {
          label: "Sim",
          onClick: () =>
            removeClient({
              event,
              setClients,
              clients,
              setTempClients,
              tempClients,
            }),
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
      overlayClassName: "overlay_delete",
    });
  };

  useEffect(() => {
    setLoadingDisable({
      inner_box: "none",
    });

    const data = api.get(`/api/clients/all`);
    data
      .then((response) => {
        setClients(response.data);
        setTempClients(response.data);
        setCounterResults(response.data.length);

        if (response.data.length <= 12) {
          setDisabled({
            left: true,
            right: true,
          });
        }
      })
      .then(() => {
        setLoadingDisable({
          loader: "none",
          inner_box: "",
        });
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        <div
          className="loader_del"
          style={{ display: loadingDisable.loader }}
        ></div>
        <div
          className="inner_box_delete"
          style={{ display: loadingDisable.inner_box }}
        >
          <div className="up-side_delete">
            <div className="input-row_delete">
              <input
                type="text"
                value={searchName}
                onChange={handleValue}
                placeholder="Buscar dinâmica por nome..."
              ></input>
            </div>
          </div>
          <div className="down-side_delete">
            {tempClients.map((client, index) => {
              if (index >= start && counterResultsPerPage < resultPerPage) {
                return (
                  <div
                    {...(counterResultsPerPage = counterResultsPerPage + 1)}
                    key={index}
                    client_id={client.id}
                    className="client-row_delete"
                    onClick={handleDelete}
                  >
                    {client.name}
                  </div>
                );
              }
              return null;
            })}
            <span id="control_page">
              <div className="buttons">
                <button
                  className="fas fa-arrow-left"
                  style={
                    (disabled.left && { color: disabled.color }) || {
                      color: "blue",
                    }
                  }
                  onClick={goFirst}
                  disabled={disabled.left}
                ></button>
                <button
                  className="fas fa-arrow-left"
                  style={{ color: disabled.color }}
                  onClick={goBack}
                  disabled={disabled.left}
                ></button>
                &nbsp;
                <button
                  className="fas fa-arrow-right"
                  style={{ color: disabled.color }}
                  onClick={goFoward}
                  disabled={disabled.right}
                ></button>
                <button
                  className="fas fa-arrow-right"
                  style={
                    (disabled.right && { color: disabled.color }) || {
                      color: "blue",
                    }
                  }
                  onClick={goLast}
                  disabled={disabled.right}
                ></button>
              </div>
              <span id="display_page">{`${pageIndex} de ${Math.ceil(
                counterResults / 12
              )}`}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteClient;
