import { BadRequestException } from '@nestjs/common';

export const isValidReservationTime = (
  reservationTime: number,
  paramMaximumReservatuionTime: number,
): void => {
  if (reservationTime > paramMaximumReservatuionTime)
    throw new BadRequestException(
      `El tiempo de reserva no puede ser mayor a ${paramMaximumReservatuionTime}`,
    );
};
