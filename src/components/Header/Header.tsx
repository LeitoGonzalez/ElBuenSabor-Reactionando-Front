import "./Header.css";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <img src="src/assets/Logo.png" alt="logo" />
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
        <Navbar className="contenedor">
          <Form className="d-flex">
            <Form.Control
              type="Search"
              placeholder="Buscar productos..."
              className="me-0"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav className="nav-link">
            <Nav.Link onClick={() => navigate("/producto")}>Producto</Nav.Link>
            <Nav.Link onClick={() => navigate("/historial")}>Historial</Nav.Link>
            <Nav.Link onClick={() => navigate("/aboutus")}>Sobre Nosotros</Nav.Link>
            <Nav.Link onClick={() => navigate("/contacto")}>Contacto</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
