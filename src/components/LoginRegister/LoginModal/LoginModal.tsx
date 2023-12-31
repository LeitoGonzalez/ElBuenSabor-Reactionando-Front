import { Button, Form, Modal } from "react-bootstrap";
import { LoginRequest } from "../../../types/LoginRequest";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthService } from "../../../services/AuthServices";
import { jwtDecode ,JwtPayload } from "jwt-decode";
import { useAuth } from "../../../context/AuthContext";

type ModalProps = {
  show: boolean;
  onHide: () => void;
  request: LoginRequest;
};

const validationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().required("Ingrese su correo electrónico"),
    password: Yup.string().required("Ingrese su contraseña")
  });
}

interface MyJWTPayload extends JwtPayload {
  rol: string;
}

export const LoginModal = ({ show, onHide, request }: ModalProps) => {
  
  const { state, login, logout } = useAuth();

  //HANDLELOGIN
  const handleLogin = async (request:LoginRequest) => {
    try{
      const response = await AuthService.login(request);

      window.localStorage.setItem('token', response.token);
      
      const token = response.token;
      const decodedToken = jwtDecode<MyJWTPayload>(token);
      const userRole = decodedToken.rol;
      
      login(userRole);
      
      onHide();
      
      
    } catch (error) {
      console.log(error);
    }
  }

  //FORMIK
  const formik = useFormik({
    initialValues: request,
    validationSchema: validationSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (obj: LoginRequest) => handleLogin(obj)
  });

  return (
    <div className="modal show">
      <Modal show={show} onHide={onHide} centered backdrop="static" >
        <Modal.Header closeButton>
          <Modal.Title>Inicia Sesion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Ingresar
            </Button>

            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Form.Text className="text-muted" style={{padding:"20px"}}>
              ¡Nunca compartas esta información!
            </Form.Text>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
