import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type ModalProps = {
  show: boolean;
  onHide: () => void;
  onLogIn: () => void;
};

export const LoginModal = ({ show, onHide, onLogIn }: ModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="modal show">
      <Modal show={show} onHide={onHide} centered backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title>Inicia Sesion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={onLogIn}>
              Ingresar
            </Button>
            <Form.Text className="text-muted" style={{padding:"20px"}}>
              Nunca compartas esta información!!1
            </Form.Text>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
