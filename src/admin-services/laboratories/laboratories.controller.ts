import { Controller } from '@nestjs/common';
import { LaboratoriesService } from './services/laboratories.service';

@Controller('laboratories')
export class LaboratoriesController {
  constructor(private readonly laboratoriesService: LaboratoriesService) {}
}
