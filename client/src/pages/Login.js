import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Alert,
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
import baseUrl from "../utils/baseUrl";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [employee, setEmployee] = useState({ id: "", password: "" });

  const handleFormChange = (k, v) => {
    setEmployee({ ...employee, [k]: v });
  };

  const handleLogin = () => {
    if (!employee.id || !employee.password) {
      Alert.info("Tous les champs doivent être remplis.", 5000);
      return;
    }

    axios
      .post(`${baseUrl}/employees/auth`, employee)
      .then((res) => {
        if (res.data.employee) {
          dispatch(setConnectedUser(res.data.employee));
          dispatch(setAccessToken(res.data.accessToken));
          localStorage.setItem("accessToken", res.data.accessToken);
          history.push("/management");
        } else {
          Alert.info("Identifiant et/ou mot de passe incorrects.", 5000);
        }
      })
      .catch((err) => {
        Alert.error("Erreur lors de la connexion au serveur.");
      });
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
                value={employee.id}
                onChange={(v) => handleFormChange("id", v)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Mot de passe</ControlLabel>
              <FormControl
                name="password"
                type="password"
                value={employee.password}
                onChange={(v) => handleFormChange("password", v)}
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
