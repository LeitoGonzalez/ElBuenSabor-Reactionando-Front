import { RubroIngrediente } from "./RubroIngrediente";
import { UnidadMedida } from "./unidadMedida";

//Interface para recir los datos de la Base de Datos

export interface Ingrediente {
  id: number;
  denominacion: string;
  fechaHoraAlta: Date;
  fechaHoraBaja: Date;
  fechaHoraModificacion: Date;
  precioCompra: number;
  stockActual: number;
  stockMinimo: number;
  urlImagen: string;
  unidadMedida: UnidadMedida;
  rubroIngrediente: RubroIngrediente;
}
