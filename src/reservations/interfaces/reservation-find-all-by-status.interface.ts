import { ReservationDetailFindAllResponse } from './reservation-detail-find-all.interface';

export interface ReservationFindAllByStatusResponse {
  reservationId: string;
  createdAt: string;
  subscriber: {
    subscriberId: string;
    username: string;
  };
  metadata: Record<string, any>;
  reservationLaboratoryEquipment: ReservationDetailFindAllResponse[];
}
