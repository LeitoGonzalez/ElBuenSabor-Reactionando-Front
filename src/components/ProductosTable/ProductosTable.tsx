import { useEffect, useState } from "react";
import { ProductoService } from "../../services/ProductoService";
import { Button, Container, Table } from "react-bootstrap";
import { DTOProducto } from "../../types/DTOProducto";
import { ModalType } from "../../types/ModalType";
import ProductoModal from "../ProductoModal/ProductoModal";

const ProductosTable = () => {
  //Inicializar un producto vacío
  const initDTOProductoRequest = (): DTOProducto=> {
    return {
      id: 0,
      tipoProducto: "",
      denominacion: "",
      descripcion: "",
      precio: 0,
      costo: 0,
      tiempoEstimadoCocina: 0,
      marca: "",
      lote: 0,
      detalleProductoCocinaList: [{
        ingrediente: {
          id: 1
        },
        cantidad: 5
      }],
      rubroProducto: {
        id: 1,
        denominacion: ""
      },
      urlImagen: "https://www.tecnagent.com/wp-content/uploads/2017/11/imagen-no-disponible.png"
    };
  };

  //useState de DTOProducto
  const [producto, setProducto] = useState<DTOProducto>(
    initDTOProductoRequest
  );

  //useState lista de productos
  const [productos, setProductos] = useState<DTOProducto[]>();

  //Refrescar lista, esto lo usamos para el useEffect
  const [refreshData, setRefreshData] = useState(false);

  //Manejo del Modal (todo esto se pasará mediante props)
  const [showModal, setShowModal] = useState(false); //Setea si se muestra o no el modal
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE); //Setea qué tipo de modal será, cuál se va a mostrar
  const [title, setTitle] = useState(""); //Setea el título que va a tener el modal

  //useEffect para obtener lista de productos
  useEffect(() => {
    const fetchProductos = async () => {
      const productoList = await ProductoService.getProductosList();
      setProductos(productoList);
    };

    fetchProductos();
  }, [refreshData]);

  console.log(JSON.stringify(productos, null, 2));

  //Lógica para elegir el modal y mostrarlo
  const handleClick = (
    newTitle: string,
    producto: DTOProducto,
    modal: ModalType
  ) => {
    setTitle(newTitle);
    setModalType(modal);
    setProducto(producto);
    setShowModal(true);
  };

  return (
    <>
      <Container className="mt-4">
        <Button
          onClick={() =>
            handleClick(
              "Nuevo producto",
              initDTOProductoRequest(),
              ModalType.CREATE
            )
          }
        >
          Agregar producto
        </Button>
      </Container>
      <Container className="mt-4">
        <Table>
          {/* Cabecera de la tabla */}
          <thead>
            <tr>
              <th>Denominacion</th>
              <th>Descripcion</th>
              <th>Costo</th>
              <th>Precio de venta</th>
              <th>Rubro</th>
              <th>Imagen</th>
              <th>Editar</th>
              <th>Baja</th>
            </tr>
          </thead>
          {/* Contenido con .map */}
          <tbody>
            {productos?.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.denominacion}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.costo}</td>
                <td>{producto.precio}</td>
                <td>{producto.rubroProducto?.denominacion}</td>
                <td>
                  <img
                    src={producto.urlImagen}
                    alt={producto.denominacion}
                    style={{ width: "100px" }}
                  ></img>
                </td>
                <td>
                  <Button variant="primary" onClick={() => handleClick("Editar producto", producto, ModalType.UPDATE)}>Editar</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleClick("Eliminar producto", producto, ModalType.DELETE)}>Dar de baja</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {showModal && (
        <ProductoModal 
          show={showModal}
          onHide={() => setShowModal(false)}
          title={title}
          modalType={modalType}
          producto={producto}
          refreshData={setRefreshData}
        />
      )}

    </>
  );
};
export default ProductosTable;
