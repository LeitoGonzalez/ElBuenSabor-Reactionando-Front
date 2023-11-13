import { useEffect, useState } from "react";
import { Ingrediente } from "../../types/Ingrediente";
import { IngredieteService } from "../../services/IngredienteService";
import { Container, Table } from "react-bootstrap";

const IngredientesTable = () => {
  //Creamos una variable, contiene los datos recibidos de la BD.
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  //Este hook se va a ejecutar cada vez que se renderice el componente o
  //Refresh data cambie de estado
  useEffect(() => {
    //Llamamos a la funcion para obtener todos los ingredientes declarados en el ingredienteService
    const fetchIngredientes = async () => {
      const ingredientes = await IngredieteService.getIngredientesList();
      setIngredientes(ingredientes);
    };
    fetchIngredientes();
  }, []);

  console.log(JSON.stringify(ingredientes, null, 2));

  //Inicializamos un ingrediente vacio

  return (
    <>
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
                <td>{ingrediente.urlImagen}</td>
                <td>{ingrediente.unidadMedida.denominacion}</td>
                <td>{ingrediente.rubroIngrediente.denominacion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default IngredientesTable;
