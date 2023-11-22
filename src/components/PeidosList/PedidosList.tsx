import { useEffect, useState } from "react";
import { PedidoService } from "../../services/PedidoService";
import { DTOPedido } from "../../types/DTOPedido";

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

  const handleCambio = async (pedido: DTOPedido)=>{
          // Guardar el cambio en el servidor
          await PedidoService.putActualizarPedido(pedido.id, window.localStorage.getItem("token"));

          // Actualizar la lista de pedidos
          setRefreshData(!refreshData);
  }

  return (
    <div>
        <h1>PEDIDOS</h1>
      {pedidos?.map((pedido) => (
        <div className="pedido" key={pedido.id}>
          <div className="info-pedido">
            <span className="cod-pedido">{pedido.id} </span>
            <span className="fechaHoraAlta-pedido">Fecha Alta Pedido:</span>
            <span className="tipo-envio-pedido">
              Fecha Alta Pedido: {pedido.tipoEnvio}
            </span>
            <span className="estado-pedido">
              Fecha Alta Pedido: {pedido.estadoPedido}
            </span>
          </div>
          <button onClick={() => handleCambio(pedido)}>CambiarEstado</button>
        </div>
      ))}
    </div>
  );
};

export default PedidosList;
