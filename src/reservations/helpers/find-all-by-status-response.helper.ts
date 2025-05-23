import { Reservation } from '../entities/reservation.entity';
import { formatDateToSpanish } from './format-date-to-spanish.helper';
import { getMinutesFromHours } from './get-minutes-from-hours.helper';

export const findAllByStatusResponse = (reservation: Reservation) => {
  return {
    reservationId: reservation.reservationId,
    createdAt: formatDateToSpanish(reservation.createdAt.toISOString()),
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
          laboratoryId:
            labEquipment.laboratoryEquipment.laboratory.laboratoryId,
          laboratory: labEquipment.laboratoryEquipment.laboratory.description,
          equipmentId: labEquipment.laboratoryEquipment.equipment.equipmentId,
          equipment: labEquipment.laboratoryEquipment.equipment.description,
        },
        reservationDate: formatDateToSpanish(
          labEquipment.reservationDate as any,
        ),
        initialHour: labEquipment.initialHour,
        finalHour: labEquipment.finalHour,
        duration:
          getMinutesFromHours(labEquipment.finalHour) -
          getMinutesFromHours(labEquipment.initialHour),
        metadata: labEquipment.metadata,
        status: labEquipment.status,
      })),
  };
};
