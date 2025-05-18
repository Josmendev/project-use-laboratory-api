import { PartialType } from '@nestjs/swagger';
import { CreateTechnicalSupportDto } from './create-technical-support.dto';

export class UpdateTechnicalSupportDto extends PartialType(CreateTechnicalSupportDto) {}
