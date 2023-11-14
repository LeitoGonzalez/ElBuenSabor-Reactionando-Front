export interface UnidadMedida {
  id: number;
  abreviatura: string;
  denominacion: string;
  fechaHoraAlta: Date;
  fechaHoraBaja: Date | null;
  fechaHoraModificacion: Date | null;
}
