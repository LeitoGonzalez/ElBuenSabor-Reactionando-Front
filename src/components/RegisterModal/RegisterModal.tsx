import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { RegisterRequest } from "../../types/RegisterRequest";
import { AuthService } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  show: boolean;
  onHide: () => void;
  request: RegisterRequest;
};

//VALIDATIONSCHEMA
const validationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().required("Ingrese un correo electrónico"),
    password: Yup.string().required("Ingrese una contraseña"),
    nombre: Yup.string().required("Ingrese su nombre"),
    apellido: Yup.string().required("Ingrese su apellido"),
    telefono: Yup.string().required("Ingrese su numero de telefono"),
  });
};

export const RegisterModal = ({ show, onHide, request }: ModalProps) => {

  const navigate = useNavigate();

  //HANDLEREGISTER
  const handleRegister = async (request: RegisterRequest) => {
    try {
      await AuthService.register(request);

      onHide();
      window.localStorage.setItem('isLoggedIn', 'true');
      navigate('/');

      console.log("Registrado correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  //FORMIK
  const formik = useFormik({
    initialValues: request,
    validationSchema: validationSchema(),
    validateOnBlur: true,
    onSubmit: (obj: RegisterRequest) => handleRegister(obj),
  });

  return (
    <div className="modal show">
      <Modal show={show} onHide={onHide} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Registrate</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Telefono */}
            <Form.Group className="mb-3" controlId="formTelefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                name="telefono"
                type="string"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.telefono}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Nombre */}
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                type="string"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Apellido */}
            <Form.Group className="mb-3" controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                name="apellido"
                type="string"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.apellido}
              </Form.Control.Feedback>
            </Form.Group>

            <Modal.Footer>
              {/* Botones */}
              <Button variant="primary" type="submit">
                Registrarse
              </Button>

              <Button variant="secondary" onClick={onHide}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
