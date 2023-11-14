import { useEffect, useState } from "react";
import { ProductoService } from "../../services/ProductoService";
import { Producto } from "../../types/Producto";
import { Button, Container, Table } from "react-bootstrap";
import { TypeDetalleCarrito } from "../../types/TypeDetalleCarrito";
/* import { TypeDetalleCarrito } from "../../types/TypeDetalleCarrito"; */

type ProductListProp={
  detalleProducto: TypeDetalleCarrito[];
  setDetalleProducto: React.Dispatch<React.SetStateAction<TypeDetalleCarrito[]>>;
  total: number;
	setTotal:React.Dispatch<React.SetStateAction<number>>;
	countProducts: number;
	setCountProducts: React.Dispatch<React.SetStateAction<number>>;
}

const ProductosList = ({detalleProducto,setDetalleProducto,total,setTotal,countProducts,setCountProducts}:ProductListProp) => {


  //useState lista de productos
  const [productos, setProductos] = useState<Producto<"COCINA" | "BEBIDA">[]>();

  const handleClick = (producto: Producto<"COCINA" | "BEBIDA">) => {

    const detalleProductoItem : TypeDetalleCarrito={
      cantidad: 1,
      precioVenta: producto.precioVenta,
      subTotal: producto.precioVenta,
      productoId: producto.id,
      titulo: producto.denominacion,
      descripcion: producto.descripcion,
      urlImagen: producto.urlImagen,
    };

    if (detalleProducto.find(item => item.productoId === producto.id)) {
			const products = detalleProducto.map(item =>
				item.productoId === producto.id
					? { ...item, cantidad: item.cantidad + 1 }
					: item
			);
			setTotal(total + detalleProductoItem.precioVenta * detalleProductoItem.cantidad);
			setCountProducts(countProducts + detalleProductoItem.cantidad);
			return setDetalleProducto([...products]);
		}

    const updatedProducts = [...detalleProducto, detalleProductoItem];
    setDetalleProducto(updatedProducts);
    setCountProducts(countProducts+1);
    setTotal(total+(detalleProductoItem.cantidad*producto.precioVenta))
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
              <th>Precio</th>
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
