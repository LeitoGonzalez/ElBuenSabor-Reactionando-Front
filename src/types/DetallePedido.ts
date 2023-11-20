import { DTOProductoCarrito } from "./DTOProductoCarrito";


export interface DetallePedido{
    cantidad: number;
    subtotal: number;
     producto: DTOProductoCarrito;  

}