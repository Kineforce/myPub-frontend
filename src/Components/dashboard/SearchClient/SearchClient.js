import { useState } from "react";
import api from "../../../api";

import "./SearchClient.css";

const fetchUsers = ({ curr_search, setClients }) => {
  if (curr_search.trim() === "") {
    setClients([]);
    return;
  }
  const data = api.get("/api/clients/search/" + curr_search);
  data.then((response) => {
    setClients(response.data);
  });
};

const SearchClient = () => {
  const [pagination, setPagination] = useState(11);
  const [searchName, setSearchName] = useState("");
  const [clients, setClients] = useState([]);

  function handleValue(event) {
    let curr_search = event.target.value;

    setSearchName(curr_search);
    fetchUsers({ curr_search, setClients });
  }

  const nextPageButton = () => {
    console.log("Show results for next page!");
  };

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
        </div>
      </div>
      <div className="down-side">
        {clients.map((client, index) => {
          if (index < pagination) {
            return (
              <div key={client.id} className="client-row">
                {client.name}
              </div>
            );
          } else {
            <button
              className="buttonNextPage"
              onClick={nextPageButton}
            ></button>;
          }
        })}
      </div>
    </div>
  );
};

export default SearchClient;
