import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";


function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <AppRoutes />
        <Container
          style={{ minHeight: "100vh", minWidth: "100%", padding: "0" }}
        ></Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
