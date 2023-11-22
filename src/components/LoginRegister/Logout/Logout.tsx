import { Button } from "react-bootstrap"
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const {state, logout} = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
      window.localStorage.removeItem('token');
      logout();

      navigate("/");
  }

  return (
    <Button variant="secondary" onClick={handleLogout}>
        Cerrar sesión
    </Button>
  )
}
export default Logout