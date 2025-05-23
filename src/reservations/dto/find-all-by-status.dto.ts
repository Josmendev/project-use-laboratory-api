import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StatusReservation } from '../enums/status-reservation.enum';

export class FindAllByStatusDto extends PaginationDto {
  @IsOptional()
  status?: StatusReservation;
}
