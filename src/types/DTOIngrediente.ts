export interface DTOIngrediente {

  id: number;
  denominacion: string;
  fechaHoraAlta: Date;
  fechaHoraBaja: Date | null;
  fechaHoraModificacion: Date | null;
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
