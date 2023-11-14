import { useEffect, useState } from "react";
import { IngredieteService } from "../../services/IngredienteService";
import { Button, Container, Table } from "react-bootstrap";
import { DTOIngrediente } from "../../types/DTOIngrediente";
import { ModalType } from "../../types/ModalType";
import IngredienteModal from "../IngredienteModal/IngredienteModal";

const IngredientesTable = () => {
  //Creamos una variable, contiene los datos recibidos de la BD.
  const [ingredientes, setIngredientes] = useState<DTOIngrediente[]>([]);

  //Variable que va a actualizar los datos de la tabla luego de cada operacion
  const [refreshData, setRefreshData] = useState(false);

  //Este hook se va a ejecutar cada vez que se renderice el componente o
  //Refresh data cambie de estado
  useEffect(() => {
    //Llamamos a la funcion para obtener todos los ingredientes declarados en el ingredienteService
    const fetchIngredientes = async () => {
      const ingredientes = await IngredieteService.getIngredientesList();
      setIngredientes(ingredientes);
    };
    fetchIngredientes();
  }, [refreshData]);

  console.log(JSON.stringify(ingredientes, null, 2));

  //Inicializamos un ingrediente vacio

  const initializableNewIngredient = (): DTOIngrediente => {
    return {
      id: 0,
      denominacion: "",
      fechaHoraAlta: new Date(),
      fechaHoraBaja: null,
      fechaHoraModificacion: null,
      precioCompra: 0,
      stockActual: 0,
      stockMinimo: 0,
      urlImagen:
        "https://www.tecnagent.com/wp-content/uploads/2017/11/imagen-no-disponible.png",
      unidadMedida: {
        id: 1,
        denominacion: "",
      },
      rubroIngrediente: {
        id: 1,
        denominacion: "",
      },
    };
  };

  //Ingrediente seeccionado que se va a pasar como prop al Modal
  const [ingrediente, setIngrediente] = useState<DTOIngrediente>(
    initializableNewIngredient
  );

  //constante para manejar el estado del Modal
  const [showModal, setShowModal] = useState(false); //Setea si se muestra o no el modal
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE); //Setea qué tipo de modal será, cuál se va a mostrar
  const [title, setTitle] = useState(""); //Setea el título que va a tener el modal

  //Lógica para elegir el modal y mostrarlo
  const handleClick = (
    newTitle: string,
    ingrediente: DTOIngrediente,
    modal: ModalType
  ) => {
    setTitle(newTitle);
    setModalType(modal);
    setIngrediente(ingrediente);
    setShowModal(true);
  };

  return (
    <>
      <Container className="mt-4">
        <Button
          onClick={() =>
            handleClick(
              "Nuevo ingrediente",
              initializableNewIngredient(),
              ModalType.CREATE
            )
          }
        >
          Agregar Ingrediente
        </Button>
      </Container>
      <Container className="mt-4">
        <Table hover>
          {/*Cabecera de la tabla */}
          <thead>
            <tr>
              <th>Denominacion</th>
              <th>FechaHoraAlta</th>
              <th>FechaHoraBaja</th>
              <th>FechaHoraModificacion</th>
              <th>Precio de Compra</th>
              <th>Stock Actual</th>
              <th>Stock Minimo</th>
              <th>Imagen</th>
              <th>Unidad de Medida</th>
              <th>Rubro de Ingrediente</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map((ingrediente) => (
              <tr key={ingrediente.id}>
                <td>{ingrediente.denominacion}</td>
                <td>{ingrediente.fechaHoraAlta}</td>
                <td>{ingrediente.fechaHoraBaja}</td>
                <td>{ingrediente.fechaHoraModificacion}</td>
                <td>{ingrediente.precioCompra}</td>
                <td>{ingrediente.stockActual}</td>
                <td>{ingrediente.stockMinimo}</td>
                <td>
                  <img
                    src={ingrediente.urlImagen}
                    alt={ingrediente.denominacion}
                    style={{ width: "100px" }}
                  ></img>
                </td>
                <td>{ingrediente.unidadMedida.denominacion}</td>
                <td>{ingrediente.rubroIngrediente.denominacion}</td>

                <td>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleClick(
                        "Editar ingrediente",
                        ingrediente,
                        ModalType.UPDATE
                      )
                    }
                  >
                    Editar
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() =>
                      handleClick(
                        "Eliminar ingrediente",
                        ingrediente,
                        ModalType.DELETE
                      )
                    }
                  >
                    Borrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {showModal && (
        <IngredienteModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title={title}
          modalType={modalType}
          ingredient={ingrediente}
          refreshData={setRefreshData}
        />
      )}
    </>
  );
};

export default IngredientesTable;
