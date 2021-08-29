import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { Icon, Nav, Panel } from "rsuite";
import "./page.scss";
import EmployeesMng from "./subpages/EmployeesMng";

const CustomNav = ({ active, onSelect, navElements, ...props }) => {
  return (
    <Nav
      {...props}
      activeKey={active}
      onSelect={onSelect}
      style={{ marginBottom: 30 }}
    >
      {navElements.map(({ key, text, icon }) => (
        <Nav.Item eventKey={key} icon={icon && <Icon icon={icon} />}>
          {text}
        </Nav.Item>
      ))}
    </Nav>
  );
};

const navElements = [
  { key: "employees", text: "Gestion des Employés", icon: "people-group" },
  { key: "leaves", text: "Gestion des Congés", icon: "toggle-up" },
];

const Dashboard = () => {
  const connectedUser = useSelector((store) => store.global.connectedUser);
  const [active, setActive] = useState("employees");
  const history = useHistory();

  useEffect(() => {
    if (!connectedUser) history.push("/login");
    history.push("/management/employees");
  }, []); // eslint-disable-line

  const handleSelect = (activeKey) => {
    setActive(activeKey);
    history.push(`/management/${activeKey}`);
  };

  return (
    <div className="page-container">
      <Panel>
        <CustomNav
          appearance="subtle"
          active={active}
          navElements={navElements}
          onSelect={handleSelect}
        />

        <Switch>
          <Route path="/management/employees">
            <EmployeesMng />
          </Route>
          <Route path="/management/leaves">
            <h1>Gestion des Congés</h1>
            <p>CONNECTED USER: {JSON.stringify(connectedUser)}</p>
          </Route>
        </Switch>
      </Panel>
    </div>
  );
};

export default Dashboard;
