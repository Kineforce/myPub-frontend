import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PagesLoginSearch from "./Login/Search/Search";
import PagesHomeSearch from "./Home/Search/Search";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PagesLoginSearch} />
        <Route path="/home" component={PagesHomeSearch} />
      </Switch>
    </Router>
  );
};

export default Root;
