import { Button, ButtonToolbar, Content, ControlLabel, Form, FormControl, FormGroup, Panel } from "rsuite";

const LoginForm = () => {
  return (
    <div className="center-content">
      <Content>
        <Panel header={<h3>Connexion</h3>} bordered>
          <Form fluid>
            <FormGroup>
              <ControlLabel>Identifiant</ControlLabel>
              <FormControl name="name" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Mote de passe</ControlLabel>
              <FormControl name="password" type="password" />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
                <Button appearance="primary">Se connecter</Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
      </Content>
    </div>
  );
};

export default LoginForm;
