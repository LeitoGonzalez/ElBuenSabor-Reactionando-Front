import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container
          style={{ minHeight: "100vh", minWidth: "100%", padding: "0" }}
        ></Container>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
