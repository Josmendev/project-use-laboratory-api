export interface ReservationDetailResponse {
  reservationLaboratoryEquipeId: string;
  laboratoryEquipment: {
    laboratoryEquipeId: string;
  };
  reservationDate: Date;
  initialHour: string;
  finalHour: string;
  metadata: Record<string, any>;
}
