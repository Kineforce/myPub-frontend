import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/login/Login";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
};

export default Root;
