import { PartialType } from '@nestjs/mapped-types';
import { CreateJuridicalPersonDto } from './create-juridical-person.dto';

export class UpdateJuridicalPersonDto extends PartialType(CreateJuridicalPersonDto) {}
