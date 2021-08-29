import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Page1 = () => {
  const connectedUser = useSelector((store) => store.global.connectedUser);
  const history = useHistory();

  useEffect(() => {
    if (!connectedUser) history.push("/login");
  }, []); // eslint-disable-line

  return (
    <>
      <h1>Page 1..</h1>
      <p>CONNECTED USER: {JSON.stringify(connectedUser)}</p>
    </>
  );
};

export default Page1;
