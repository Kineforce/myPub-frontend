import { useState, useEffect } from "react";
import api from "../../../api";

import "./SearchClient.css";

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

const SearchClient = () => {
  const [searchName, setSearchName] = useState("");
  const [clients, setClients] = useState([]);
  const [counterResults, setCounterResults] = useState(0);

  function handleValue(event) {
    let curr_search = event.target.value;
    curr_search = curr_search.replace(/[^a-zA-Z. ]/gi, "");

    setSearchName(curr_search);
    fetchUsers({ curr_search, setClients, setCounterResults });
  }

  useEffect(() => {
    const data = api.get(`/api/clients/all`);
    data.then((response) => {
      setClients(response.data);
      setCounterResults(response.data.length);
    });
  }, []);

  return (
    <div className="inner_box">
      <div className="up-side">
        <div className="input-row">
          <input
            type="text"
            value={searchName}
            onChange={handleValue}
            placeholder="Buscar por nome..."
          ></input>
          <span id="counterResults">
            Quantidade de resultados: <span>{counterResults}</span>
          </span>
        </div>
      </div>
      <div className="down-side">
        {clients.map((client, index) => {
          return (
            <div key={index} className="client-row">
              {client.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchClient;
