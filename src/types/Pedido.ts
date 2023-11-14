 import { DetallePedido } from "./DetallePedido"; 
import { EstadoPedido } from "./Enums/EstadoPedido";
import { FormaPago } from "./Enums/FormaPago";
import { TipoEnvio } from "./Enums/TipoEnvio";

export interface Pedido{
    fechaHoraAlta: Date;
    fechaHoraPedido: Date;
    formaPago: FormaPago;
    estado: EstadoPedido;
    tipoEnvio: TipoEnvio;
    total: number;
    detallePedido: DetallePedido[]; 
    

}