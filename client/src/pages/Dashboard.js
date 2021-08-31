import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { Icon, Nav, Panel } from "rsuite";
import EmployeesMng from "./subpages/EmployeesMng";
import LeavesMng from "./subpages/LeavesMng";
import EmployeeLeaves from "./subpages/EmployeeLeaves";
import "./page.scss";

const CustomNav = ({ active, onSelect, navElements, ...props }) => {
  return (
    <Nav
      {...props}
      activeKey={active}
      onSelect={onSelect}
      style={{ marginBottom: 30 }}
    >
      {navElements.map(({ key, text, icon }, index) => (
        <Nav.Item
          key={index}
          eventKey={key}
          icon={icon && <Icon icon={icon} />}
        >
          {text}
        </Nav.Item>
      ))}
    </Nav>
  );
};

const Dashboard = () => {
  const connectedUser = useSelector((store) => store.global.connectedUser);
  const [navElements, setNavElements] = useState([]);
  const [active, setActive] = useState("employees");
  const history = useHistory();

  useEffect(() => {
    if (!connectedUser) history.push("/login");
    else {
      setNavElements(
        connectedUser.level === "Admin"
          ? [
              {
                key: "employees",
                text: "Gestion des Employés",
                icon: "people-group",
              },
              { key: "leaves", text: "Gestion des Congés", icon: "toggle-up" },
              { key: "view-leaves", text: "Congés Demandés", icon: "th-list" },
            ]
          : [{ key: "view-leaves", text: "Congés Demandés", icon: "th-list" }]
      );
      
      if (connectedUser.level === "Admin")
        history.push("/management/employees");
      else history.push("/management/view-leaves");
    }
  }, [connectedUser]); // eslint-disable-line

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
          {connectedUser?.level === "Admin" && (
            <Route path="/management/employees">
              <EmployeesMng />
            </Route>
          )}
          {connectedUser?.level === "Admin" && (
            <Route path="/management/leaves">
              <LeavesMng />
            </Route>
          )}
          <Route path="/management/view-leaves">
            <EmployeeLeaves />
          </Route>
        </Switch>
      </Panel>
    </div>
  );
};

export default Dashboard;
