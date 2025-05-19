import { Controller } from '@nestjs/common';
import { ProgrammingService } from './services/programming.service';

@Controller('programming')
export class ProgrammingController {
  constructor(private readonly programmingService: ProgrammingService) {}
}
