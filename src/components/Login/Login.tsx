import { useState } from "react";
import { Button} from "react-bootstrap";
import { LoginModal } from "../LoginModal/LoginModal";

import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  //Navegacion
  const navigate = useNavigate();

  //Funcion al loguearse
  const onLogIn = () => {
    window.localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  }

  return (
    <div>
      <Button
        className="boton-login"
        variant="secondary"
        onClick={handleShowModal}
      >
        Iniciar Sesión
      </Button>


      {showModal && (
        <LoginModal show={showModal} onHide={() => setShowModal(false)} onLogIn={onLogIn} />
      )}

    </div>
  );
};
