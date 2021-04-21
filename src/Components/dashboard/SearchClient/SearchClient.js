import { useState, useEffect, useRef } from "react";
import api from "../../../api";
import debounce from "lodash.debounce";

import "./SearchClient.css";

const SearchClient = () => {
  const [searchName, setSearchName] = useState("");
  const [clients, setClients] = useState([]);
  const [counterResults, setCounterResults] = useState(0);
  const [start, setStart] = useState(0);
  const [disabled, setDisabled] = useState({
    left: true,
    right: false,
    color: "black",
  });
  const [pageIndex, setPageIndex] = useState(0);
  const resultPerPage = 14;

  let counter = 0;

  function goFoward(e) {
    if (counter === 14) {
      setPageIndex(pageIndex + 1);
      setStart(start + 14);
      setDisabled({ left: false });
    } else {
      setDisabled({ right: true });
    }

    if (start + resultPerPage + 14 > clients.length) {
      setDisabled({ right: true });
    }
    console.log(`Start          --> ${start}`);
    console.log(`resultPerPage  --> ${resultPerPage}`);
    console.log(`clients.length --> ${clients.length}`);
    console.log(`pageIndex      --> ${pageIndex}`);
  }

  function goLast() {}

  function goBack(e) {
    if (start !== 0) {
      setPageIndex(pageIndex - 1);
      setStart(start - 14);
      setDisabled({ right: false });
    } else {
      setDisabled({ left: true });
    }

    if (pageIndex === 1) {
      setDisabled({ left: true });
    }

    console.log(`Start          --> ${start}`);
    console.log(`resultPerPage  --> ${resultPerPage}`);
    console.log(`clients.length --> ${clients.length}`);
    console.log(`pageIndex      --> ${pageIndex}`);
  }

  // Executa a ultima chamada da função
  const debouncedSave = useRef(
    debounce((curr_search, arr_clients) => {
      var new_arr = [];
      var search_counter = 0;

      arr_clients.forEach((arr_client) => {
        if (
          !arr_client.name.toUpperCase().includes(curr_search.toUpperCase())
        ) {
          arr_client.show_search = 0;
          new_arr.push(arr_client);
        } else {
          arr_client.show_search = 1;
          search_counter = search_counter + 1;
          new_arr.push(arr_client);
        }
      });

      setCounterResults(search_counter);
      setClients(new_arr);
    }, 500)
  ).current;

  function handleValue(event) {
    let curr_search = event.target.value;
    curr_search = curr_search.replace(/[^a-zA-Z.0-9 ]/gi, "");

    setSearchName(curr_search);
    debouncedSave(curr_search, clients);
  }

  useEffect(() => {
    document
      .getElementsByClassName("inner_box")[0]
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
          .getElementsByClassName("inner_box")[0]
          .removeAttribute("hidden");
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="loader"></div>
        <div className="inner_box" hidden>
          <div className="up-side">
            <div className="input-row">
              <input
                id="search_input"
                type="text"
                value={searchName}
                onChange={handleValue}
                placeholder="Busca dinâmica..."
              ></input>
              <span id="counterResults">
                Total de clientes: <span>{counterResults}</span>
              </span>
            </div>
          </div>
          <div className="down-side">
            <table id="search_client_table">
              <thead>
                <tr>
                  <th>Nome </th>
                  <th>CPF</th>
                  <th>Gênero</th>
                  <th>Telefone</th>
                  <th>Endereço</th>
                </tr>
              </thead>
              {clients.map((client, index) => {
                if (
                  client.show_search === 1 &&
                  index >= start &&
                  counter < resultPerPage
                ) {
                  return (
                    <>
                      <tbody {...(counter = counter + 1)}>
                        <tr
                          style={{
                            backgroundColor:
                              counter % 2 === 0
                                ? "rgba(75, 75, 75, 0.2)"
                                : "rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <td>{client.name}</td>
                          <td>{client.cpf}</td>
                          <td>{client.gender}</td>
                          <td>{client.phone_number}</td>
                          <td>{client.adress}</td>
                        </tr>
                      </tbody>
                    </>
                  );
                }
                return null;
              })}
            </table>
            <span id="control_page">
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
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchClient;
