import { Reservation } from '../entities/reservation.entity';
import { ReservationResponse } from '../interfaces/reservation-response.interface';

export const formatReservationResponse = (
  reservation: Reservation,
): ReservationResponse => {
  return {
    reservationId: reservation.reservationId,
    subscriber: {
      subscriberId: reservation.subscriber.subscriberId,
      username: reservation.subscriber.username,
    },
    metadata: reservation.metadata,
    reservationLaboratoryEquipment:
      reservation.reservationLaboratoryEquipment.map((labEquipment) => ({
        reservationLaboratoryEquipeId:
          labEquipment.reservationLaboratoryEquipeId,
        laboratoryEquipment: {
          laboratoryEquipeId:
            labEquipment.laboratoryEquipment.laboratoryEquipeId,
        },
        reservationDate: labEquipment.reservationDate,
        initialHour: labEquipment.initialHour,
        finalHour: labEquipment.finalHour,
        metadata: labEquipment.metadata,
      })),
  };
};
