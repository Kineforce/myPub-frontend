import { useState, useEffect, useRef } from "react";
import api from "../../../api";
import debounce from "lodash.debounce";

import "./SearchClient.css";

const SearchClient = () => {
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

  // Variáveis definindo controle de paginação
  const [counterResults, setCounterResults] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [start, setStart] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  let counterResultsPerPage = 0;
  const resultPerPage = 12;

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
          left: true,
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

  useEffect(() => {
    setLoadingDisable({
      inner_box: "hidden",
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
          className="loader_search"
          style={{ display: loadingDisable.loader }}
        ></div>
        <div
          className="inner_box"
          style={{ display: loadingDisable.inner_box }}
        >
          <div className="up-side">
            <div className="input-row">
              <input
                id="search_input"
                type="text"
                value={searchName}
                onChange={handleValue}
                placeholder="Busca dinâmica por nomes..."
              ></input>
              <span id="counterResults">
                Total de clientes: <span>{counterResults}</span>
              </span>
            </div>
          </div>
          <div className="down-side">
            {tempClients.map((client, key) => {
              if (key >= start && counterResultsPerPage < resultPerPage) {
                return (
                  <div
                    className="client-row_search"
                    key={key}
                    id={key}
                    {...(counterResultsPerPage = counterResultsPerPage + 1)}
                  >
                    <div>{client.name}</div>
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

export default SearchClient;
