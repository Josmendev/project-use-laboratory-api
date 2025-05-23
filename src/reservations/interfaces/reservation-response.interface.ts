import { ReservationDetailResponse } from './reservation-detail-response.interface';

export interface ReservationResponse {
  reservationId: string;
  createdAt: string;
  subscriber: {
    subscriberId: string;
    username: string;
  };
  metadata: Record<string, any>;
  reservationLaboratoryEquipment: ReservationDetailResponse[];
}
