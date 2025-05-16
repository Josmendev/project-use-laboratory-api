import { PartialType } from '@nestjs/mapped-types';
import { CreateAttributesTypeDto } from './create-attributes-type.dto';

export class UpdateAttributesTypeDto extends PartialType(CreateAttributesTypeDto) {}
