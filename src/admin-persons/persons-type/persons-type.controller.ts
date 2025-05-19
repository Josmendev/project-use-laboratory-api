import { Controller } from '@nestjs/common';
import { PersonsTypeService } from './persons-type.service';

@Controller('persons-type')
export class PersonsTypeController {
  constructor(private readonly personsTypeService: PersonsTypeService) {}
}
