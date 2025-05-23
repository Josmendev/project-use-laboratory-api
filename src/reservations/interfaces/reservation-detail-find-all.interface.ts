export interface ReservationDetailFindAllResponse {
  reservationLaboratoryEquipeId: string;
  laboratoryEquipment: {
    laboratoryId: string;
    laboratory: string;
    equipmentId: string;
    equipment: string;
  };
  reservationDate: string;
  initialHour: string;
  finalHour: string;
  duration: number;
  metadata: Record<string, any>;
}
