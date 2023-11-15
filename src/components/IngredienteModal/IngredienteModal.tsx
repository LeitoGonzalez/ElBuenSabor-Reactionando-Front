import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
} from "react-bootstrap";
import { DTOIngrediente } from "../../types/DTOIngrediente";
import { ModalType } from "../../types/ModalType";

//Dependencias para validar formularios
import * as Yup from "yup";
import { useFormik } from "formik";
import { IngredieteService } from "../../services/IngredienteService";

//Notificacion para el usuario
import { toast } from "react-toastify";

type IngredientModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  ingredient: DTOIngrediente;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

//Yup (esquema de validacion)
const validationSchema = () => {
  return Yup.object().shape({
    id: Yup.number().integer().min(0),
    denominacion: Yup.string().required(
      "El nombre del ingrediente es requerido"
    ),
    precioCompra: Yup.number().min(0).required("El precio es obligatorio"),
    tipoUnidadMedida: Yup.string().required("Elije una unidad de medida"),
    rubroIngrediente: Yup.string().required(
      "El rubro del Ingrediente es requerido"
    ),
  });
};

const IngredienteModal = ({
  show,
  onHide,
  title,
  modalType,
  ingredient,
  refreshData,
}: IngredientModalProps) => {
  //Formik (utiliza el esquema de validacion para crear un formulario dinámico y que bloquee el formulario en caso de haber errores)

  const formik = useFormik({
    initialValues: ingredient,
    validationSchema: validationSchema(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (obj: DTOIngrediente) => handleSaveUpdate(obj),
  });

  //CREATE - ACTUALIZAR
  const handleSaveUpdate = async (ingredient: DTOIngrediente) => {
    try {
      const isNew = ingredient.id === 0;
      if (isNew) {
        await IngredieteService.createIngrediente(ingredient);
      } else {
        await IngredieteService.updateIngrediente(ingredient.id, ingredient);
      }
      toast.success(isNew ? "Ingrediente creado" : "Ingrediente actualizado", {
        position: "top-center",
      });
      onHide();
      refreshData((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error");
    }
  };

  //DELETE
  const handleDelete = async (ingredient: DTOIngrediente) => {
    try {
      await IngredieteService.deleteIngrediente(ingredient.id);
      toast.success("Ingrediente eliminado con exito", {
        position: "top-center",
      });
      onHide();
      refreshData((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error");
    }
  };

  return (
    <>
      {modalType === ModalType.DELETE ? (
        <>
          <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                ¿Desea eliminar el ingrediente{" "}
                <strong>{ingredient.denominacion}</strong>?
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(ingredient)}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={formik.handleSubmit}>
                <FormGroup controlId="formDenominacion">
                  <FormLabel> Denominación </FormLabel>
                  <Form.Control
                    name="denominación"
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

                <FormGroup controlId="formPrecioCompra">
                  <FormLabel> Precio de Compra</FormLabel>
                  <Form.Control
                    name="precioCompra"
                    type="number"
                    value={formik.values.precioCompra || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.precioCompra && formik.touched.precioCompra
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.precioCompra}
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="formTipoUnidadMedida">
                  <FormLabel>Unidad de Medida</FormLabel>
                  <FormSelect
                    name="tipoUnidadMedida"
                    id="unidadMedida"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.unidadMedida.denominacion}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Gramo">Gramos</option>
                    <option value="Unidad">Unidad</option>
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.denominacion}
                  </Form.Control.Feedback>
                </FormGroup>

                <FormGroup controlId="formrubroIngrediente">
                  <FormLabel>Rubro Ingrediente</FormLabel>
                  <FormSelect
                    name="formrubroIngrediente"
                    id="rubroIngrediente"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rubroIngrediente.denominacion}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Gramo">Verdura</option>
                    <option value="Unidad">Condimento</option>
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.denominacion}
                  </Form.Control.Feedback>
                </FormGroup>

                <Modal.Footer>
                  <Button variant="secondary" onClick={onHide}>
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit">
                    Agregar
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default IngredienteModal;
