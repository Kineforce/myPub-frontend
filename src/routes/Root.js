import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import apiClient from "services/api";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/login/Login";
import { useState } from "react";

const Root = () => {
  // const headers = {
  //   Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
  // };

  // const [loggedIn, setLoggedIn] = useState(
  //   sessionStorage.getItem("loggedIn") === "true" || false
  // );

  // const login = () => {
  //   setLoggedIn(true);
  //   sessionStorage.setItem("loggedIn", true);
  // };

  // const logout = () => {
  //   apiClient.post("/api/logout", [], { headers: headers }).then((response) => {
  //     if (response.status === 204) {
  //       setLoggedIn(false);
  //       sessionStorage.setItem("loggedIn", false);
  //     }
  //   });
  // };

  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  const manageLogin = (data) => {
    setToken({
      token: data,
    });
    console.log("2");
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          component={Login}
          manageLogin={manageLogin}
        />
        <Route path="/dashboard" component={Dashboard} token={token} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default Root;
