import { useEffect, useState } from "react";
import { ProductoService } from "../../services/ProductoService";
import { Producto } from "../../types/Producto";
import { Button, Container, Table } from "react-bootstrap";
/* import { TypeDetalleCarrito } from "../../types/TypeDetalleCarrito"; */

/* interface ProductosMenuProps {
  onClick: (detalle:TypeDetalleCarrito) => void;
} */

const ProductosMenu = (/* {onClick}:ProductosMenuProps */) => {


  //useState lista de productos
  const [productos, setProductos] = useState<Producto<"COCINA" | "BEBIDA">[]>();




  //useEffect para obtener lista de productos
  useEffect(() => {
    const fetchProductos = async () => {
      const productoList = await ProductoService.getProductosList();
      setProductos(productoList);
    };

    fetchProductos();
  }, []);

  console.log(JSON.stringify(productos, null, 2));

  //Lógica para mandar el producto al carrito
/*   const handleClick = (producto: Producto<"COCINA" | "BEBIDA">) => {
    // Convertir el producto a TypeDetalleCarrito
    const detalleCarritoProducto = {
      cantidad: 1,
      precioVenta: producto.precioVenta,
      subTotal: producto.precioVenta,
      productoId: producto.id,
      titulo: producto.denominacion,
      descripcion: producto.descripcion,
      urlImagen: producto.urlImagen,
    };

    // Llamar a la función agregarAlCarrito con el producto convertido
    onClick(detalleCarritoProducto);
  };
  */

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
                <td>{producto.precioVenta}</td>
                <td>{producto.rubroProducto.denominacion}</td>
                <td>
                  <img
                    src={producto.urlImagen}
                    alt={producto.denominacion}
                    style={{ width: "100px" }}
                  ></img>
                </td>
                <td>
                  <Button variant="primary" /* onClick={() => handleClick(producto)} */>Agregar a Carrito</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

    </>
  );
};
export default ProductosMenu;
