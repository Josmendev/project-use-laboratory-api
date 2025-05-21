import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FindAllDisponibilityListDto extends PaginationDto {
  @IsOptional()
  searchTerm?: string;

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
