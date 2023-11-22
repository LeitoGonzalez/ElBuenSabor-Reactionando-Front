import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { Login } from "../../LoginRegister/Login/Login";
import { Register } from "../../LoginRegister/Register/Register";
import Logout from "../../LoginRegister/Logout/Logout";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();

  //Authentication state
  const { state } = useAuth();

  return (
    <>
      <div className="border-bottom py-2">
        <Navbar expand="lg" className="contenedor">
          <Container>
            <Nav.Link className="logonav" onClick={() => navigate("/")}>
              <img src="src/assets/Logo.png" alt="logo" />
            </Nav.Link>

            {/* BOTONES DE LOGIN */}
            <div className="botones">
              {state.isAuthenticated ? (
                <>
                  <Logout />
                </>
              ) : (
                <>
                  <Login />
                  <Register />
                </>
              )}
              <Button onClick={() => console.log(state)}>
                Test de authContext
              </Button>
            </div>
          </Container>
        </Navbar>
      </div>
      <div className="navbar" style={{ backgroundColor: "#FFD13A" }}>
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

          {/* Herramientas */}
          {(state.role === "ADMIN" || state.role == "EMPLEADO") && (
            <>
              <Dropdown>
                <Dropdown.Toggle variant="success">
                  Herramientas
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/abmproductos")}>
                    ABM Productos
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/abmingredientes")}>
                    ABM Ingredientes
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/abmpedidos")}>ABM Pedidos</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </Navbar>
      </div>
    </>
  );
};

export default Header;
