import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { DTOIngrediente } from "../../types/DTOIngrediente";
import { ModalType } from "../../types/ModalType";

//Dependencias para validar formularios
import * as Yup from "yup";
import { useFormik } from "formik";
import { IngredieteService } from "../../services/IngredienteService";

type IngredientModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  ingredient: DTOIngrediente;
};

const IngredienteModal = ({
  show,
  onHide,
  title,
  modalType,
  ingredient,
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
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  //DELETE
  const handleDelete = async (ingredient: DTOIngrediente) => {
    try {
      await IngredieteService.deleteIngrediente(ingredient.id);
      onHide();
    } catch (error) {
      console.error(error);
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
      unidadMedida: Yup.string().required("La unidad de medida es requerido"),
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
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
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
      ) : (
        <>
          <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            className="modal-xl"
          >
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
                    value={formikIngrediente.values.denominacion || ""}
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

                <Form.Group controlId="formunidadMedida">
                  <FormLabel> Unidad de Medida</FormLabel>
                  <Form.Control
                    name="unidadMedida"
                    type="text"
                    value={
                      formikIngrediente.values.unidadMedida.denominacion || ""
                    }
                    onChange={formikIngrediente.handleChange}
                    onBlur={formikIngrediente.handleBlur}
                    isInvalid={Boolean(
                      formikIngrediente.errors.unidadMedida?.denominacion &&
                        formikIngrediente.touched.unidadMedida?.denominacion
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formikIngrediente.errors.unidadMedida?.denominacion}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formrubroIngrediente">
                  <FormLabel> Rubro de Ingrediente</FormLabel>
                  <Form.Control
                    name="rubroIngrediente"
                    type="text"
                    value={
                      formikIngrediente.values.rubroIngrediente.denominacion ||
                      ""
                    }
                    onChange={formikIngrediente.handleChange}
                    onBlur={formikIngrediente.handleBlur}
                    isInvalid={Boolean(
                      formikIngrediente.errors.rubroIngrediente?.denominacion &&
                        formikIngrediente.touched.rubroIngrediente?.denominacion
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formikIngrediente.errors.rubroIngrediente?.denominacion}
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
