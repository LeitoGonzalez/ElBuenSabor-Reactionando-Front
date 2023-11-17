import { Button } from "react-bootstrap"

type LogoutProps = {
    logout: () => void
}

const Logout = ({logout}:LogoutProps) => {

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        logout();
    }

  return (
    <Button variant="secondary" onClick={handleLogout}>
        Cerrar sesión
    </Button>
  )
}
export default Logout