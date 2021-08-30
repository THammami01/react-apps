import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {
  const connectedUser = useSelector((store) => store.global.connectedUser);
  const history = useHistory();

  useEffect(() => {
    if (!connectedUser) history.push("/login");
  }, []); // eslint-disable-line

  return <></>;
};

export default Home;
