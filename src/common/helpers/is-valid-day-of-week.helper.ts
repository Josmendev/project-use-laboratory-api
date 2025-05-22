import { BadRequestException } from '@nestjs/common';
import { DayOfWeekEnum } from '../enums/day-of-week.enum';

export const isValidDayOfWeek = (dayOfWeek: string, date: string): void => {
  const parsedDate = new Date(`${date}T12:00:00`);
  if (isNaN(parsedDate.getTime()))
    throw new BadRequestException('Fecha inválida');
  const actualDayIndex = parsedDate.getDay(); // 0 = Domingo
  const expectedDayName = DayOfWeekEnum[actualDayIndex]; // 'Lunes', etc.

  if (expectedDayName.toLowerCase() !== dayOfWeek.toLowerCase())
    throw new BadRequestException(
      `El día de la semana no coincide con la fecha. Esperado: ${expectedDayName}, recibido: ${dayOfWeek}`,
    );
};
