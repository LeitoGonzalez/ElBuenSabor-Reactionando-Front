import { useState } from "react";
import { Button } from "react-bootstrap";
import { LoginModal } from "../LoginModal/LoginModal";

import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../types/LoginRequest";

export const Login: React.FC = () => {
  const initRequest = (): LoginRequest => {
    return {
      email: "",
      password: "",
    };
  };

  const [showModal, setShowModal] = useState(false);

  const [request, setRequest] = useState<LoginRequest>(initRequest);

  const handleShowModal = () => {
    setShowModal(true);
  };

  //Navegacion
  const navigate = useNavigate();

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
        <LoginModal
          show={showModal}
          onHide={() => setShowModal(false)}
          request={request}
        />
      )}
    </div>
  );
};
