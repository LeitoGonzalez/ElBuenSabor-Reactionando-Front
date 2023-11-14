import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <AppRoutes />
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
