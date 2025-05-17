import { PartialType } from '@nestjs/mapped-types';
import { CreateInformationTypeDto } from './create-information-type.dto';

export class UpdateInformationTypeDto extends PartialType(CreateInformationTypeDto) {}
