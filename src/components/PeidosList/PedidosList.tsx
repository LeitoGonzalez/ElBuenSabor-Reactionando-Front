import { useEffect, useState } from "react";
import { PedidoService } from "../../services/PedidoService";
import { DTOPedido } from "../../types/DTOPedido";
import { Button, Container, Table } from "react-bootstrap";

const PedidosList = () => {
  //useState lista de pedidos
  const [pedidos, setPedidos] = useState<DTOPedido[]>();

  //Refrescar lista, esto lo usamos para el useEffect
  const [refreshData, setRefreshData] = useState(false);

  //useEffect para obtener lista de pedidos
  useEffect(() => {
    const fetchProductos = async () => {
      const pedidosList = await PedidoService.getPedidosList(
        window.localStorage.getItem("token")
      );
      setPedidos(pedidosList);
    };

    fetchProductos();
  }, [refreshData]);

  console.log(JSON.stringify(pedidos, null, 2));

  const handleCambio = async (pedido: number) => {
    // Guardar el cambio en el servidor
    await PedidoService.putActualizarPedido(
      pedido,
      window.localStorage.getItem("token")
    );

    // Actualizar la lista de pedidos
    setRefreshData(!refreshData);
  };

  return (
    <Container className="mt-3">
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estado</th>
            <th>Cambiar</th>
          </tr>
        </thead>
        <tbody>
          {pedidos?.map((pedido) =>
            <tr>
              <td>{pedido.id}</td>
              <td>{pedido.estadoPedido}</td>
              <td><Button onClick={()=>handleCambio(pedido.id)}>Cambiar estado</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PedidosList;
