export interface UnidadMedida {
  id: number;
  abreviatura: string;
  denominacion: string;
  fechaHoraAlta: string;
  fechaHoraBaja: string | null;
  fechaHoraModificacion: string | null;
}
