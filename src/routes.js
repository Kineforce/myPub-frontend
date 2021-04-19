import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Context } from "./Context/AuthContext";

import Login from "./Components/login/Login";
import Dashboard from "./Components/dashboard/Dashboard";
import Register from "./Components/register/Register";

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute exact path="/register" component={Register} />
      <CustomRoute isPrivate exact path="/Dashboard" component={Dashboard} />
      <Redirect to="/dashboard" />
    </Switch>
  );
}
