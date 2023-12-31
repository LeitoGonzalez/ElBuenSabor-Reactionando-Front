import {
  Button,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  Row,
} from "react-bootstrap";
import { ModalType } from "../../../types/ModalType";
import { DTOProducto } from "../../../types/DTOProducto";
import { ProductoService } from "../../../services/ProductoService";
import * as Yup from "yup";
import { useFormik } from "formik";

type ProductoModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  producto: DTOProducto;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

//Validation schema
const validationSchema = () => {
  return Yup.object().shape({
    id: Yup.number().integer().min(0),
    denominacion: Yup.string().required("El nombre del producto es requerido"),
    descripcion: Yup.string().required("Debe poner una descripcion"),
    precio: Yup.number().min(0).required("El precio es obligatorio"),
    costo: Yup.number().min(0).required("El costo es obligatorio"),
    tipoProducto: Yup.string().required("Elije un tipo de producto"),
    urlImagen: Yup.string()
  });
};

const ProductoModal = ({
  show,
  onHide,
  title,
  modalType,
  producto,
  refreshData,
}: ProductoModalProps) => {
  //Formulario
  const formik = useFormik({
    initialValues: producto,
    validationSchema: validationSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (obj: DTOProducto) => handleSaveUpdate(obj),
  });

  //Función para crear o actualizar
  const handleSaveUpdate = async (producto: DTOProducto) => {
    try {
      const isNew = producto.id === 0;
      if (isNew) {
        await ProductoService.createProduct(producto, window.localStorage.getItem('token'));
      } else {
        await ProductoService.updateProduct(producto, producto.id, window.localStorage.getItem('token'));
      }

      onHide(); //Una vez que se crea el producto, se esconde el Modal
      refreshData((prevState) => !prevState); //Se cambia refreshState para actualizar la lista del useEffect()
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (producto: DTOProducto) => {
    try {
      await ProductoService.deleteProduct(producto.id, window.localStorage.getItem('token'));

      onHide();
      refreshData((prevState) => !prevState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {modalType === ModalType.DELETE ? (
        /* Modal para un DELETE */
        <>
          <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                ¿Desea eliminar el producto <br />{" "}
                <strong>{producto.denominacion}</strong>?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(producto)}>
                {" "}
                {/* handleDelete */}
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        /* Modal para un ADD o UPDATE */
        <>
          <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              {/* Acá va el formulario entero */}
              <Form onSubmit={formik.handleSubmit}>

                <FormGroup controlId="formTipoProducto">
                  <FormLabel>Tipo de producto</FormLabel>
                  <FormSelect
                    name="tipoProducto"
                    id="tipoProducto"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tipoProducto}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Cocina">Cocina</option>
                    <option value="Insumo">Insumo</option>
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.denominacion}
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="formDenominacion">
                  <FormLabel>Denominacion</FormLabel>
                  <Form.Control
                    name="denominacion"
                    type="text"
                    value={formik.values.denominacion || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.denominacion && formik.touched.denominacion
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.denominacion}
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="formDescripcion">
                  <FormLabel>Descripcion</FormLabel>
                  <Form.Control
                    name="descripcion"
                    type="text"
                    value={formik.values.descripcion || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.descripcion && formik.touched.descripcion
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.descripcion}
                  </Form.Control.Feedback>
                </FormGroup>

                <Row>
                  <Col>
                    <FormGroup controlId="precio">
                      <FormLabel>Precio</FormLabel>
                      <Form.Control
                        name="precio"
                        type="number"
                        value={formik.values.precio || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(
                          formik.errors.precio && formik.touched.precio
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.precio}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup controlId="costo">
                      <FormLabel>Costo</FormLabel>
                      <Form.Control
                        name="costo"
                        type="number"
                        value={formik.values.costo || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(
                          formik.errors.costo && formik.touched.costo
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.costo}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup controlId="formUrlImagen">
                  <FormLabel>URL de Imagen</FormLabel>
                  <Form.Control
                    name="urlImagen"
                    type="text"
                    value={formik.values.urlImagen || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.urlImagen && formik.touched.urlImagen
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.urlImagen}
                  </Form.Control.Feedback>
                </FormGroup>

                {formik.values.tipoProducto === "Insumo" ? (
                  <>
                    <FormGroup controlId="marca">
                      <FormLabel>Marca</FormLabel>
                      <Form.Control
                        name="marca"
                        type="string"
                        value={formik.values.marca || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(
                          formik.errors.marca && formik.touched.marca
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.marca}
                      </Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup controlId="lote">
                      <FormLabel>Lote</FormLabel>
                      <Form.Control
                        name="lote"
                        type="string"
                        value={formik.values.lote || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(
                          formik.errors.lote && formik.touched.lote
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.lote}
                      </Form.Control.Feedback>
                    </FormGroup>
                  </>
                ) : (
                  <>
                    <FormGroup controlId="tiempoEstimadoCocina">
                      <FormLabel>Tiempo de cocina estimado</FormLabel>
                      <Form.Control
                        name="tiempoEstimadoCocina"
                        type="number"
                        value={formik.values.tiempoEstimadoCocina || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(
                          formik.errors.tiempoEstimadoCocina &&
                            formik.touched.tiempoEstimadoCocina
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.tiempoEstimadoCocina}
                      </Form.Control.Feedback>
                    </FormGroup>
                    <p>Implementar selección de ingredientes</p>
                  </>
                )}

                <Modal.Footer>
                  <Button variant="secondary" onClick={onHide}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit">
                    {" "}
                    {/* submit */}
                    Agregar
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
      ;
    </>
  );
};
export default ProductoModal;