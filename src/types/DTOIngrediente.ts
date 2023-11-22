export interface DTOIngrediente {

  id: number;
  denominacion: string;
  precioCompra: number;
  stockActual: number;
  stockMinimo: number;
  urlImagen: string;
  unidadMedida: {
    id: number;
    denominacion: string;
  };
  rubroIngrediente: {
    id: number;
    denominacion: string;
  };
}
