import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert, Container } from "rsuite";
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
import axios from "axios";
import baseUrl from "./utils/baseUrl";

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
      axios
        .get(`${baseUrl}/employees/verify-token`, {
          headers: { Authorization: accessToken },
        })
        .then((res) => {
          dispatch(setAccessToken(accessToken));
          dispatch(setConnectedUser(res.data.employee));
          history.push("/management/employees");
        })
        .catch((err) => {
          Alert.error("Erreur lors de la connexion au serveur.");
        });
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
