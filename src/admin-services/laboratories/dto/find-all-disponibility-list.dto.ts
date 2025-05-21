import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class FindAllDisponibilityListDto {
  @IsString({
    message: 'El campo día de la semana debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El campo día de la semana no puede estar vacío' })
  dayOfWeek: string;

  @IsString({ message: 'El campo fecha debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El campo fecha no puede estar vacío' })
  date: string;

  @IsString({
    message: 'El campo hora inicial debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El campo hora inicial no puede estar vacío' })
  initialHour: string;

  @IsInt({ message: 'El campo tiempo de reserva debe ser un número' })
  @IsNotEmpty({ message: 'El campo tiempo de reserva no puede estar vacío' })
  reservationTime: number;

  @IsInt({ message: 'El campo tiempo máximo de reserva debe ser un número' })
  @IsNotEmpty({
    message: 'El campo tiempo máximo de reserva no puede estar vacío',
  })
  maximumReservationTime: number;

  @IsInt({
    message: 'El campo numero de reservas por dia máximo debe ser un número',
  })
  @IsNotEmpty({
    message: 'El campo numero de reservas por dia máximo no puede estar vacío',
  })
  numberReservationDays: number;
}
