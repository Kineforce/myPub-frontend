import { useState, useEffect, useRef } from "react";
import api from "../../../api";
import debounce from "lodash.debounce";

import "./SearchClient.css";

const fetchAll = ({ setClients, setCounterResults }) => {
  const data = api.get(`/api/clients/all`);
  data.then((response) => {
    setClients(response.data);
    setCounterResults(response.data.length);
  });
};

const SearchClient = () => {
  const [searchName, setSearchName] = useState("");
  const [clients, setClients] = useState([]);
  const [counterResults, setCounterResults] = useState(0);

  // Executa a ultima chamada da função
  const debouncedSave = useRef(
    debounce((curr_search, arr_clients) => {
      var new_arr = [];
      var search_counter = 0;

      arr_clients.forEach((arr_client) => {
        if (!arr_client.name.includes(curr_search)) {
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
    curr_search = curr_search.replace(/[^a-zA-Z. ]/gi, "");

    setSearchName(curr_search);
    debouncedSave(curr_search, clients);
  }

  function fetchAllUsers() {
    fetchAll({ setClients, setCounterResults });
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
                type="text"
                value={searchName}
                onChange={handleValue}
                placeholder="Buscar por nome..."
              ></input>
              <button
                style={{ marginLeft: "10px", padding: "12px" }}
                type="submit"
                id="buttonAll"
                onClick={fetchAllUsers}
              >
                {" "}
                Buscar tudo
              </button>
              <span id="counterResults">
                Quantidade de resultados: <span>{counterResults}</span>
              </span>
            </div>
          </div>
          <div className="down-side">
            {clients.map((client, index) => {
              if (client.show_search === 1) {
                return (
                  <div key={index} className="client-row">
                    {client.name}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchClient;
