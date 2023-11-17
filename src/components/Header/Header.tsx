import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="border-bottom py-2">
        <Navbar expand="lg" className="contenedor">
          <Container>
            <Nav.Link className="logonav" onClick={() => navigate("/")}>
              <img src="src/assets/Logo.png" alt="logo" />
            </Nav.Link>
            <div className="botones">
              <Login/>
              <Register/>
            </div>
          </Container>
        </Navbar>
      </div>
      <div className="navbar" style={{backgroundColor: "#FFD13A"}}>
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav">
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
              <Nav.Link onClick={() => navigate("/producto")}>
                Producto
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/historial")}>
                Historial
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/aboutus")}>
                Sobre Nosotros
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/contacto")}>
                Contacto
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
