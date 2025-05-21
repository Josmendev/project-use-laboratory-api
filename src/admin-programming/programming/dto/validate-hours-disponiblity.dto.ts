import { IsNotEmpty, IsString } from 'class-validator';
import { FindAllDisponibilityListDto } from 'src/admin-services/laboratories/dto/find-all-disponibility-list.dto';

export class ValidateHoursDisponibilityDto extends FindAllDisponibilityListDto {
  @IsString({
    message: 'El campo hora final debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El campo hora final no puede estar vacío' })
  finalHour: string;

  @IsString({
    message: 'El campo id de subscripcion debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El campo id de subscripcion no puede estar vacío' })
  subscriptionId: string;
}
