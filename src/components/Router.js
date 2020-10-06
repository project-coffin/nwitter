import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";

const MyRouter = ({ isLoggedIn, viewer }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Navigation viewer={viewer} /> : <Auth />}
        </Route>
        <Route exact path="/home">
          <Home viewer={viewer} />
        </Route>
        <Route exact path="/profile">
          <Profile viewer={viewer} />
        </Route>
      </Switch>
    </Router>
  );
};

export default MyRouter;
