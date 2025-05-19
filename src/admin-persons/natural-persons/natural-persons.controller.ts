import { Controller } from '@nestjs/common';
import { NaturalPersonsService } from './natural-persons.service';

@Controller('natural-persons')
export class NaturalPersonsController {
  constructor(private readonly naturalPersonsService: NaturalPersonsService) {}
}
