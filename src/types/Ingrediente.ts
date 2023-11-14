import { RubroIngrediente } from "./RubroIngrediente";
import { UnidadMedida } from "./unidadMedida";

export interface Ingrediente{
    denominacion:string;
    fechaHoraAlta:Date;
    fechaHoraBaja:Date;
    fechaHoraModificacion:Date;
    precioCompra:number;
    stockActual:number;
    stockMinimo:number;
    urlImagen:string;
    unidadMedida: UnidadMedida;
    rubroIngrediente: RubroIngrediente;
}