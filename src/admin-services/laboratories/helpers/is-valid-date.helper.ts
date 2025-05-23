import { BadRequestException } from '@nestjs/common';

export const isValidDate = (date: string, initialHour: string): void => {
  const inputDateTime = new Date(`${date}T${initialHour}`);
  const now = new Date();

  if (inputDateTime < now) {
    throw new BadRequestException(
      'La fecha y/o la hora no pueden ser anteriores a la actual',
    );
  }
};
