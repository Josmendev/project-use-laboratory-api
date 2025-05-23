import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreateReservationDetailDto } from './create-reservation-detail.dto';

export class CreateReservationDto {
  @IsOptional()
  metadata?: Record<string, any>;

  @IsArray({ message: 'Los detalles deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => CreateReservationDetailDto)
  reservationDetails: CreateReservationDetailDto[];
}
