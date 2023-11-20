import { useState } from "react";
import { Button} from "react-bootstrap";
import { LoginModal } from "../LoginModal/LoginModal";


export const Login = () => {

import { LoginRequest } from "../../types/LoginRequest";


export const Login: React.FC = () => {
  const initRequest = (): LoginRequest => {
    return {
      email: "",
      password: "",
    };
  };


  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

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
        <LoginModal show={showModal} onHide={() => setShowModal(false)} />
      )}
    </div>
  );
};
