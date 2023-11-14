import { Pedido } from "../types/Pedido";


const BASE_URL = "http://localhost:8080/api/v1/pedido";

export const PedidoService = {
    //Acá hacemos todas las consultas HTTP

    createPedido: async (dtoRequest : Pedido): Promise<Pedido> => {
        
        const response = await fetch(`${BASE_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dtoRequest),
        });

        const data = await response.json();

        return data;
    },    

}