import { Controller } from '@nestjs/common';
import { JuridicalPersonsService } from './juridical-persons.service';

@Controller('juridical-persons')
export class JuridicalPersonsController {
  constructor(
    private readonly juridicalPersonsService: JuridicalPersonsService,
  ) {}
}
