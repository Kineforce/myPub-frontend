import { useState, useEffect } from "react";

import "./ShowInfo.css";
import api from "../../../../api";

import ActionField from "./ActionField/ActionField";
import UpdateField from "./ActionField/UpdateField";

const ShowInfo = (props) => {
  const [actions, setActions] = useState([]);
  const [isShown, setIsShown] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  let client_id = props.props.client.id;

  function refreshActions() {
    api.get(`api/clients/getAction/` + client_id).then((response) => {
      setActions(response.data);
    });
    setIsUpdate(false);
  }

  useEffect(() => {
    api.get(`api/clients/getAction/` + client_id).then((response) => {
      setActions(response.data);
    });
  }, [client_id]);

  function deleteAction(action_id) {
    api.delete(`/api/clients/delAction/${action_id}`).then((response) => {
      refreshActions();
    });
  }

  function updateAction(action_id) {
    setIsShown(false);
    setIsUpdate(action_id);
  }

  function handleMouseEnter(client_id) {
    setIsShown(client_id);
  }

  return (
    <>
      <div className="showInfoDiv">
        <div className="basicInfo">
          <div className="titleBasicInfo">Informações do cliente</div>
          <div className="dataBasicInfo">
            <span className="subTitlesDataBasicInfo">Nome</span>
            <span className="itemDataBasicInfo">{props.props.client.name}</span>
            <span className="subTitlesDataBasicInfo">CPF</span>
            <span className="itemDataBasicInfo">{props.props.client.cpf}</span>
            <span className="subTitlesDataBasicInfo">Sexo</span>
            <span className="itemDataBasicInfo">
              {props.props.client.gender === "f" && "Feminino"}
              {props.props.client.gender === "m" && "Masculino"}
              {props.props.client.gender === "o" && "Não informado"}
            </span>
            <span className="subTitlesDataBasicInfo">Telefone</span>
            <span className="itemDataBasicInfo">
              {props.props.client.phone_number}
            </span>
            <span className="subTitlesDataBasicInfo">Endereço</span>
            <span className="itemDataBasicInfo">
              {props.props.client.adress}
            </span>
          </div>
        </div>
        <div className="clientActions">
          <div className="titleClientActions">Histórico do cliente</div>
          <div className="actionDataInfo">
            {actions.map((action) => {
              return (
                <div
                  key={action.id}
                  id={action.id}
                  className="action"
                  onMouseMove={() => {
                    handleMouseEnter(action.id);
                  }}
                >
                  <span className="text_action">
                    {action.action} - R$ {action.price} - {action.product} -{" "}
                    {action.formated_date.date} {action.formated_date.hour}
                    {isUpdate === action.id && (
                      <UpdateField
                        actionId={action.id}
                        currTextAction={action.action}
                        refreshActions={refreshActions}
                        setIsUpdate={setIsUpdate}
                      />
                    )}
                  </span>
                  {isShown === action.id && (
                    <span className="mod_action">
                      <span
                        className="deleteAction fas fa-trash"
                        onClick={() => deleteAction(action.id)}
                        title="Deletar ação"
                      ></span>
                      <span
                        className="updateAction fas fa-pen"
                        onClick={() => updateAction(action.id)}
                        title="Atualizar ação"
                      ></span>
                    </span>
                  )}
                </div>
              );
            })}
            <div className="dataClientActions">
              <ActionField
                clientId={client_id}
                refreshActions={refreshActions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowInfo;
