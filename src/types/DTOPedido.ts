import { TipoEnvio } from "./Enums/TipoEnvio"
import { EstadoPedido } from "./Enums/EstadoPedido"

export interface DTOPedido {
id: number;
fechaHoraAlta: Date;
tipoEnvio: TipoEnvio;
estadoPedido: EstadoPedido;

}