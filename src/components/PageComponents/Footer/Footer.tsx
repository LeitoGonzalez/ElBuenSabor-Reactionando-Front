import { Nav } from "react-bootstrap";
import {
  Clock,
  Envelope,
  Facebook,
  GeoAlt,
  Instagram,
  Phone,
  Whatsapp,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (

    <footer className="mt-auto py-3" >
      <div className="container footer">

        <div>
          <Nav.Link className="logonav" onClick={() => navigate("/")}>
            <img src="src/assets/Logo.png" alt="logo" />
          </Nav.Link>
        </div>
        <div className="horario">
          <div className="tarde">
            <p>
              <Clock />
              Tarde
            </p>
            <p>Lunes a Domingo</p>
            <p>20:00 a 00:00</p>
          </div>
          <div className="mañana">
            <p>
              <Clock />
              Mañana
            </p>
            <p>Sabado a Domingo</p>
            <p>11:00 a 15:00</p>
          </div>
        </div>
        <div className="ubicacion">
          <p>
            <GeoAlt />
            Coronel Rodriguez 273, Mendoza
          </p>
          <p>
            <Envelope />
            elbuensabor@gmail.com
          </p>
          <p>
            <Phone />
            261-249-8460
          </p>
        </div>
        <div className="redes">
          <Facebook />
          <Instagram />
          <Whatsapp />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
