import React from "react";
import { Container } from "rsuite";
import AppHeader from "./AppHeader";
import LoginForm from "./LoginForm";
import AppFooter from "./AppFooter";
import "./App.scss";

function App() {
  return (
    <div>
      <Container>
        <AppHeader />
        <LoginForm />
        <AppFooter />
      </Container>
    </div>
  );
}

export default App;
