import { Footer } from "rsuite";

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center", padding: ".5rem" }}>
      Délice | {new Date().getFullYear()}
    </Footer>
  );
};

export default AppFooter;
