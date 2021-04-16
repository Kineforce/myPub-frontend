import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Context } from "./Context/AuthContext";

import Login from "./Components/login/Login";
import Dashboard from "./Components/dashboard/Dashboard";

export default function Routes() {
  const { authenticated } = useContext(Context);

  return (
    <Switch>
      {authenticated === false && (
        <Route exact path="/login" component={Login} />
      )}
      {authenticated === true && (
        <Route exact path="/Dashboard" component={Dashboard} />
      )}
      <Redirect to="/login" />
    </Switch>
  );
}
