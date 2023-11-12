import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container
          style={{ minHeight: "100vh", minWidth: "100%", padding: "0" }}
        >
          <AppRoutes />
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
