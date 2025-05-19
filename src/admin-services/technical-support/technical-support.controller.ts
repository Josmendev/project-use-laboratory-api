import { Controller } from '@nestjs/common';
import { TechnicalSupportService } from './technical-support.service';

@Controller('technical-support')
export class TechnicalSupportController {
  constructor(
    private readonly technicalSupportService: TechnicalSupportService,
  ) {}
}
