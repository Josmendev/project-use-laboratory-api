import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonsTypeDto } from './create-persons-type.dto';

export class UpdatePersonsTypeDto extends PartialType(CreatePersonsTypeDto) {}
