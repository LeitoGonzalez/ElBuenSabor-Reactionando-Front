import Header from "./components/PageComponents/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/PageComponents/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import { AuthProvider} from "./context/AuthContext";

function App() {

  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <Router>
          <Header />
          <AppRoutes />
          <Container
            style={{ minHeight: "100vh", minWidth: "100%", padding: "0" }}
          ></Container>
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
