import React from "react";

const ShowInfo = (props) => {
  return (
    <>
      <div>{props.name}</div>
      <div>{props.cpf}</div>
      <div>{props.gender}</div>
      <div>{props.phone_number}</div>
      <div>{props.adress}</div>
    </>
  );
};

export default ShowInfo;
