import { Controller } from '@nestjs/common';
import { InformationTypeService } from './information-type.service';

@Controller('information-type')
export class InformationTypeController {
  constructor(
    private readonly informationTypeService: InformationTypeService,
  ) {}
}
