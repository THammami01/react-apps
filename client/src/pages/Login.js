import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ButtonToolbar,
  Content,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  IconButton,
  Panel,
} from "rsuite";
import {
  setAccessToken,
  setConnectedUser,
} from "../store/actions/action-creators";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({ userId: "Tarek Hammami", userPwd: "" });

  const handleFormChange = (k, v) => {
    setUser({ ...user, [k]: v });
  };

  const handleLogin = () => {
    dispatch(setConnectedUser({ ...user, firstname: "Tarek", lastname: "Hammami", level: "Admin", id: "0001" }));
    dispatch(setAccessToken("..."));
    localStorage.setItem("accessToken", "...");
    history.push("/management");
  };

  return (
    <div className="center-content">
      <Content>
        <Panel header={<h3>Connexion</h3>} bordered>
          <Form fluid>
            <FormGroup>
              <ControlLabel>Identifiant</ControlLabel>
              <FormControl
                name="name"
                value={user.userId}
                onChange={(v) => handleFormChange("userId", v)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Mot de passe</ControlLabel>
              <FormControl
                name="password"
                type="password"
                value={user.userPwd}
                onChange={(v) => handleFormChange("userPwd", v)}
              />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
                <IconButton
                  appearance="primary"
                  icon={<Icon icon="sign-in" />}
                  placement="right"
                  onClick={handleLogin}
                >
                  Se connecter
                </IconButton>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
      </Content>
    </div>
  );
};

export default Login;
