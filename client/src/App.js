import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "rsuite";
import {
  setAccessToken,
  setConnectedUser,
  setTheme,
} from "./store/actions/action-creators";

import AppHeader from "./common/AppHeader";
import AppFooter from "./common/AppFooter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.scss";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    let theme = localStorage.getItem("theme");
    dispatch(setTheme(theme));

    if (!accessToken) {
      history.push("/login");
    } else {
      dispatch(setAccessToken(accessToken));
      dispatch(
        setConnectedUser({
          firstname: "Tarek",
          lastname: "Hammami",
          level: "Admin",
          id: "0001",
        })
      );
      history.push("/management/employees");
    }
  }, []); // eslint-disable-line

  return (
    <div>
      <Container>
        <AppHeader />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/management">
            <Dashboard />
          </Route>
        </Switch>
        <AppFooter />
      </Container>
    </div>
  );
};

export default App;
