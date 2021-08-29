import React, { useEffect } from "react";
import { Container } from "rsuite";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.scss";

import AppHeader from "./common/AppHeader";
import AppFooter from "./common/AppFooter";
import LoginForm from "./pages/LoginForm";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import { setAccessToken } from "./store/actions/action-creators";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      history.push("/login");
    } else {
      dispatch(setAccessToken(accessToken));
      history.push("/page1");
    }
  }, []); // eslint-disable-line

  return (
    <div>
      <Container>
        <AppHeader />
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/page1">
            <Page1 />
          </Route>
          <Route path="/page2">
            <Page2 />
          </Route>
        </Switch>
        <AppFooter />
      </Container>
    </div>
  );
};

export default App;
