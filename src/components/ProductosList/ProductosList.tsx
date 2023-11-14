import { useEffect, useState } from "react";
import { ProductoService } from "../../services/ProductoService";
import { Button, Container, Table } from "react-bootstrap";
import { TypeDetalleCarrito } from "../../types/TypeDetalleCarrito";
import { DTOProducto } from "../../types/DTOProducto";


/* import { TypeDetalleCarrito } from "../../types/TypeDetalleCarrito"; */
type ProductListProp={
  detalleProducto: TypeDetalleCarrito[];
  setDetalleProducto: React.Dispatch<React.SetStateAction<TypeDetalleCarrito[]>>;
}

const ProductosList = ({detalleProducto,setDetalleProducto}:ProductListProp) => {

  //useState lista de productos
  const [productos, setProductos] = useState<DTOProducto[]>();

  //Actualizar carrito

  const handleClick = (producto: DTOProducto) => {

    const detalleProductoItem : TypeDetalleCarrito ={
      cantidad: 1,
      precioVenta: producto.costo,
      subTotal: producto.precio,
      productoId: producto.id,
      titulo: producto.denominacion,
      descripcion: producto.descripcion,
      urlImagen: producto.urlImagen,
      id: 0
    };
    
    const updatedProducts = [...detalleProducto, detalleProductoItem];
    setDetalleProducto(updatedProducts);
  };

  //useEffect para obtener lista de productos

  useEffect(() => {
    const fetchProductos = async () => {
      const productoList = await ProductoService.getProductosList();
      setProductos(productoList);
    };

    fetchProductos();
  }, []);

  console.log(JSON.stringify(productos, null, 2));

  return (
    <>
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
              <th>Carrito</th>
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
                  <Button variant="primary"  onClick={() => handleClick(producto)} >Agregar a Carrito</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

    </>
  );
};
export default ProductosList;
