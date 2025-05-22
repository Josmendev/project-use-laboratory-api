import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FindAllDisponibilityListDto extends PaginationDto {
  @IsOptional()
  searchTerm?: string;

  @IsString({
    message: 'El campo día de la semana debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El campo día de la semana no puede estar vacío' })
  dayOfWeek: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha debe estar en formato YYYY-MM-DD',
  })
  @IsDateString(
    {},
    {
      message: 'La fecha debe estar en formato YYYY-MM-DD',
    },
  )
  @IsNotEmpty({
    message: 'La fecha no puede estar vacía',
  })
  date: string;

  @IsString({ message: 'La fecha no puede estar vacía' })
  @IsNotEmpty({ message: 'La hora inicial no puede estar vacío' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'La hora inicial debe estar en formato HH:mm',
  })
  initialHour: string;

  @Type(() => Number)
  @IsInt({ message: 'El campo tiempo de reserva debe ser un número' })
  @IsNotEmpty({ message: 'El campo tiempo de reserva no puede estar vacío' })
  reservationTime: number;

  @Type(() => Number)
  @IsInt({ message: 'El campo tiempo máximo de reserva debe ser un número' })
  @IsNotEmpty({
    message: 'El campo tiempo máximo de reserva no puede estar vacío',
  })
  maximumReservationTime: number;

  @Type(() => Number)
  @IsInt({
    message: 'El campo numero de reservas por dia máximo debe ser un número',
  })
  @IsNotEmpty({
    message: 'El campo numero de reservas por dia máximo no puede estar vacío',
  })
  numberReservationDays: number;
}
