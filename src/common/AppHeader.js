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
  setTheme,
} from "../store/actions/action-creators";
import { getFirstNChars } from "../utils/functions";

const AppHeader = () => {
  const history = useHistory();
  const connectedUser = useSelector((state) => state.global.connectedUser);
  const theme = useSelector((state) => state.global.theme);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(removeAccessToken());
    dispatch(removeConnectedUser());
    history.push("/login");
  };

  const tooltip = <Tooltip>Se déconnecter</Tooltip>;

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);

    dispatch(setTheme(newTheme));
    window.location.reload(false);
  };

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
              // history.push("/");
            }}
          />

          <div
            style={{ padding: ".75rem 1rem", display: "flex", gap: ".25rem" }}
          >
            <IconButton
              icon={<Icon icon={theme === "light" ? "moon-o" : "sun-o"} />}
              appearance="primary"
              onClick={switchTheme}
            />

            {connectedUser && (
              <ButtonToolbar>
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
                    {getFirstNChars(connectedUser.userId, 10)}
                  </IconButton>
                </Whisper>
              </ButtonToolbar>
            )}
          </div>
        </Navbar.Header>
      </Navbar>
    </Header>
  );
};

export default AppHeader;
