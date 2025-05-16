import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesTypeDto } from './create-services-type.dto';

export class UpdateServicesTypeDto extends PartialType(CreateServicesTypeDto) {}
