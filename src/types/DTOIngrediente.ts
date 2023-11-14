export interface DTOIngrediente {
  id: number;
  denominacion: string;
  fechaHoraAlta: string;
  fechaHoraBaja: string;
  fechaHoraModificacion: string;
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
