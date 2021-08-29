import { Footer } from "rsuite";

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center", padding: ".5rem" }}>
      Délice | Gestion des Congés |{" "}
      {String(new Date().getMonth() + 1).padStart(2, "0")}/{new Date().getFullYear()}
    </Footer>
  );
};

export default AppFooter;
