import { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setConnectedUser,
} from "../store/actions/action-creators";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const isLoading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({ userId: "", userPwd: "" });

  useEffect(() => {
    // dispatch(startLoading());
  }, []); // eslint-disable-line

  const handleFormChange = (k, v) => {
    setUser({ ...user, [k]: v });
  };

  const handleLogin = () => {
    dispatch(setConnectedUser(user));
    history.push("/page1");
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

      <h3>{isLoading}</h3>
    </div>
  );
};

export default LoginForm;
