import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";

const MyRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Navigation /> : <Auth />}
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
};

export default MyRouter;
