import { BadRequestException } from '@nestjs/common';

export const validateReservationHourRange = (
  initialHour: string,
  finalHour: string,
  index?: number,
) => {
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const initial = toMinutes(initialHour);
  const final = toMinutes(finalHour);

  if (initial >= final) {
    throw new BadRequestException(
      `La hora inicial (${initialHour}) debe ser menor que la hora final (${finalHour})` +
        (index !== undefined ? ` (fila ${index + 1})` : ''),
    );
  }
};
