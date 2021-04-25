import { useState } from "react";

import api from "../../../../../api";

const UpdateField = ({ actionId, currTextAction, refresh, setIsUpdate }) => {
  const [updatedInput, setUpdatedInput] = useState(currTextAction);

  function sendUpdateApi() {
    api
      .put(`api/clients/updateAction/${actionId}`, {
        action: updatedInput,
      })
      .then((response) => {
        refresh();
      });
  }

  function cancelUpdate() {
    setIsUpdate(false);
  }

  return (
    <div className="saveUpdateAction">
      <input
        className="inputUpdate"
        value={updatedInput}
        onChange={(event) => {
          setUpdatedInput(event.target.value);
        }}
      />
      <div className="updateBtns">
        <span onClick={sendUpdateApi} className="saveBtn fas fa-save"></span>
        <span onClick={cancelUpdate} className="saveBtn fas fa-times"></span>
      </div>
    </div>
  );
};

export default UpdateField;
