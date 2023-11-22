import { DTOPedido } from "../types/DTOPedido";
import { Pedido } from "../types/Pedido";


const BASE_URL = "http://localhost:8080/api/v1/pedido";

export const PedidoService = {
    //Acá hacemos todas las consultas HTTP

    createPedido: async (dtoRequest : Pedido, token: string | null): Promise<Pedido> => {
        
        const response = await fetch(`${BASE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "AUTHORIZATION": `Bearer ${token}`
          },
          body: JSON.stringify(dtoRequest),
        });

        const data = await response.json();

        return data;
    },    

    putActualizarPedido: async (pedido: DTOPedido, token: string | null): Promise<Pedido> => {
      const response = await fetch(`${BASE_URL}/admin/updatePedido` ,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pedido)
      });
      const data = await response.json();

      return data;
  },

    getPedidosList: async (token: string | null): Promise<DTOPedido[]> => {
      const response = await fetch(`${BASE_URL}/getAllPedidos` ,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "AUTHORIZATION": `Bearer ${token}`
        }
      });
      const data = await response.json();

      return data;
  }

}