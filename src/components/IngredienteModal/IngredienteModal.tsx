import { Button, Form, FormLabel, FormSelect, Modal } from "react-bootstrap";
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

const IngredienteModal = ({
  show,
  onHide,
  title,
  modalType,
  ingredient,
  refreshData,
}: IngredientModalProps) => {
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

  //Yup (esquema de validacion)
  const validationSchemaIngredient = () => {
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

  //Formik (utiliza el esquema de validacion para crear un formulario dinámico y que bloquee el formulario en caso de haber errores)

  const formikIngrediente = useFormik({
    initialValues: ingredient,
    validationSchema: validationSchemaIngredient(),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (obj: DTOIngrediente) => handleSaveUpdate(obj),
  });

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

            <Modal.Footer className="mt-4">
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
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={formikIngrediente.handleSubmit}>
                <Form.Group controlId="formDenominacion">
                  <FormLabel> Descripción</FormLabel>
                  <Form.Control
                    name="denominación"
                    type="text"
                    value={formikIngrediente.values.denominacion || " "}
                    onChange={formikIngrediente.handleChange}
                    onBlur={formikIngrediente.handleBlur}
                    isInvalid={Boolean(
                      formikIngrediente.errors.denominacion &&
                        formikIngrediente.touched.denominacion
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formikIngrediente.errors.denominacion}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPrecioCompra">
                  <FormLabel> Precio de Compra</FormLabel>
                  <Form.Control
                    name="precioCompra"
                    type="number"
                    value={formikIngrediente.values.precioCompra || ""}
                    onChange={formikIngrediente.handleChange}
                    onBlur={formikIngrediente.handleBlur}
                    isInvalid={Boolean(
                      formikIngrediente.errors.precioCompra &&
                        formikIngrediente.touched.precioCompra
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formikIngrediente.errors.precioCompra}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formTipoUnidadMedida">
                  <FormLabel>Unidad de Medida</FormLabel>
                  <FormSelect
                    name="tipoUnidadMedida"
                    id="unidadMedida"
                    onChange={formikIngrediente.handleChange}
                    onBlur={formikIngrediente.handleBlur}
                    value={formikIngrediente.values.unidadMedida.denominacion}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Gramo">Gramos</option>
                    <option value="Unidad">Unidad</option>
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    {formikIngrediente.errors.denominacion}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formrubroIngrediente">
                  <FormLabel>Rubro Ingrediente</FormLabel>
                  <FormSelect
                    name="formrubroIngrediente"
                    id="rubroIngrediente"
                    onChange={formikIngrediente.handleChange}
                    onBlur={formikIngrediente.handleBlur}
                    value={
                      formikIngrediente.values.rubroIngrediente.denominacion
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="Gramo">Verdura</option>
                    <option value="Unidad">Condimento</option>
                  </FormSelect>
                  <Form.Control.Feedback type="invalid">
                    {formikIngrediente.errors.denominacion}
                  </Form.Control.Feedback>
                </Form.Group>

                <Modal.Footer className="mt-4">
                  <Button variant="secondary" onClick={onHide}>
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!formikIngrediente.isValid}
                  >
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
