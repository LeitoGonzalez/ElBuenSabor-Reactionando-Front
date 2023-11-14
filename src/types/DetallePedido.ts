import { DTOProductoDetalle } from "./DTOProductoDetalle";


export interface DetallePedido{
    cantidad: number;
    subtotal: number;
    producto: DTOProductoDetalle;  

}

