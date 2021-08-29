import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Header,
  Navbar,
  ButtonToolbar,
  Icon,
  IconButton,
  Whisper,
  Tooltip,
} from "rsuite";
import {
  removeAccessToken,
  removeConnectedUser,
} from "../store/actions/action-creators";

const AppHeader = () => {
  const history = useHistory();
  const connectedUser = useSelector((state) => state.global.connectedUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(removeAccessToken());
    dispatch(removeConnectedUser());
    history.push("/login");
  };

  const tooltip = <Tooltip>Se déconnecter</Tooltip>;

  return (
    <Header>
      <Navbar
        appearance="inverse"
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid lightgrey",
        }}
      >
        <Navbar.Header
          style={{
            height: "70px",
            width: "97%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src="assets/imgs/delice.png"
            alt="Délice"
            className="navbar-logo"
            onClick={() => {
              history.push("/");
            }}
          />

          {connectedUser && (
            <ButtonToolbar style={{ padding: ".75rem 1rem" }}>
              <Whisper
                placement="autoVerticalEnd"
                trigger="hover"
                speaker={tooltip}
              >
                <IconButton
                  appearance="primary"
                  icon={<Icon icon="sign-out" />}
                  placement="right"
                  onClick={handleLogout}
                >
                  {connectedUser.userId}
                </IconButton>
              </Whisper>
            </ButtonToolbar>
          )}
        </Navbar.Header>
      </Navbar>
    </Header>
  );
};

export default AppHeader;
