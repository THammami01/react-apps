import { Header, Navbar } from "rsuite";

const AppHeader = () => {
  return (
    <Header>
      <Navbar
        appearance="inverse"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Navbar.Header style={{ height: "70px", width: "95%" }}>
          <img
            src="assets/imgs/delice.png"
            alt="Délice"
            className="navbar-logo"
          />
        </Navbar.Header>
      </Navbar>
    </Header>
  );
};

export default AppHeader;
