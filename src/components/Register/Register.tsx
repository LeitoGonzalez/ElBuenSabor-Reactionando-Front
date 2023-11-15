import { useState } from "react";
import { Button} from "react-bootstrap";
import { RegisterModal } from "../RegisterModal/RegisterModal";

export const Register = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Button
        className="boton-register"
        variant="primary"
        onClick={handleShowModal}
      >
        Registrarse
      </Button>

      
      {showModal && (
        <RegisterModal show={showModal} onHide={() => setShowModal(false)} />
      )}
    </div>
  );
};
