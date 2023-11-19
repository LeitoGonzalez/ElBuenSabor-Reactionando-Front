import { useState } from "react";
import { Button} from "react-bootstrap";
import { RegisterModal } from "../RegisterModal/RegisterModal";
import { RegisterRequest } from "../../../types/RegisterRequest";

export const Register = () => {
  
  const initRequest = () : RegisterRequest => {
    return {
      email: "",
      password: "",
      nombre: "",
      apellido: "",
      telefono: ""
    }
  }

  const [showModal, setShowModal] = useState(false);

  const [request, setRequest] = useState<RegisterRequest>(initRequest);
  
  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button
        className="boton-register"
        variant="primary"
        onClick={handleClick}
      >
        Registrarse
      </Button>

      {showModal && (
        <RegisterModal show={showModal} onHide={() => setShowModal(false)} request={request}/>
      )}
    </>
  );
};
