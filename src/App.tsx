import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
