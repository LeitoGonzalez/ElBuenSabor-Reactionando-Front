import { useState } from "react";

/* import { TypeCarrito } from "../../types/TypeCarrito"; */
import { Table } from "react-bootstrap";
import { TypeDetalleCarrito } from "../../types/TypeDetalleCarrito";
import BotonRestar from "../BotonRestar/BotonRestar";
import BotonSumar from "../BotonSumar/BotonSumar";
import { Trash } from "react-bootstrap-icons";

const Carrito = () => {

    //Codigo para ver si el carrito no tiene ningun producto (es nuevo) o ya tiene algo
/*   const initializableNewCarrito = (): Carrito => {
    return {
      total:0,
      detalleCarrito:[]
    };
  }; 

  
  const [carrito,setCarrito] = useState<Carrito>(initializableNewCarrito)
  */ 


  
  //Variable que va a contener los productos seleccionados por el usuario
  const [detalleCarrito, setDetalleCarrito] = useState<TypeDetalleCarrito[]>([]);
  

  // Función para restar la cantidad
  const restarCantidad = (productoId: number) => {
    setDetalleCarrito((prevDetalleCarrito) => {
      return prevDetalleCarrito.map((detalle) => {
        if (detalle.productoId === productoId && detalle.cantidad > 0) {
          return { ...detalle, cantidad: detalle.cantidad - 1 };
        }
        return detalle;
      });
    });
  };

  // Función para sumar la cantidad
   const sumarCantidad = (productoId: number) => {
    setDetalleCarrito((prevDetalleCarrito) => {
      return prevDetalleCarrito.map((detalle) => {
        if (detalle.productoId === productoId) {
          return { ...detalle, cantidad: detalle.cantidad + 1 };
        }
        return detalle;
      });
    });
  };



  return (
    <>
      <h1>Carrito de Compras</h1>
      

      <Table hover>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>PrecioUnitario</th>
              <th>Imagen</th>
              <th>Cantidad</th>
              <th>Sub Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {detalleCarrito.map((detalleCarrito) => (
              <tr key={detalleCarrito.productoId}>
                <td>{detalleCarrito.titulo}</td>
                <td>{detalleCarrito.descripcion}</td>
                <td>{detalleCarrito.precioVenta}</td>
                <td>
                  <img
                    src={detalleCarrito.urlImagen}
                    alt={detalleCarrito.titulo}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>
                <BotonRestar onClick={() => restarCantidad(detalleCarrito.productoId)} />
                {detalleCarrito.cantidad}
                <BotonSumar onClick={() => sumarCantidad(detalleCarrito.productoId)} />
              </td>
                <td>{detalleCarrito.subTotal}</td>
                <td>
                  <Trash/></td>
              </tr>
            ))}
          </tbody>
        </Table>
    </>
  );
};

export default Carrito;
