export interface RubroIngrediente {
  id: number;
  denominacion: string;
  fechaHoraAlta: Date;
  fechaHoraBaja: Date | null;
  fechaHoraModificacion: Date | null;
}
