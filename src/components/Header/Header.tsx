import { Button, Form, Nav } from "react-bootstrap";
import { Cart, Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <Nav.Link className="logonav" onClick={() => navigate("/")}>
          <img src="src/assets/Logo.png" alt="logo" />
        </Nav.Link>
        <div className="botones">
          <Button variant="primary" className="reg">
            Iniciar Sesión
          </Button>
          <Button variant="primary" className="login">
            Registrarse
          </Button>
        </div>
      </div>
      <div className="nav">
        <Form className="d-flex lupa">
          <Form.Control
            type="Search"
            placeholder="Buscar productos..."
            aria-label="Search"
          />
          <Button variant="outline-secondary">
            <Search />
          </Button>
        </Form>
        <Nav.Link onClick={() => navigate("/producto")}>Producto</Nav.Link>
        <Nav.Link onClick={() => navigate("/historial")}>Historial</Nav.Link>
        <Nav.Link onClick={() => navigate("/aboutus")}>Sobre Nosotros</Nav.Link>
        <Nav.Link onClick={() => navigate("/contacto")}>Contacto</Nav.Link>

        <Nav.Link onClick={() => navigate("/carrito")}>
          <Button>
            <Cart />
          </Button>
        </Nav.Link>
      </div>
    </>
  );
};

export default Header;
