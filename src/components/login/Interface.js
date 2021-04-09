import React, { useState } from "react";
import "./Interface.css";

const InterfaceLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  return (
    <div id="interface-login__box-login">
      <form id="interface-login__login">
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsername}
          placeholder="username"
          required
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
          placeholder="password"
          required
        />
        <input type="submit" id="submit_btn" value="Login" />
        <span id="feedback_msg"></span>
      </form>
    </div>
  );
};

export default InterfaceLogin;
