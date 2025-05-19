import { Controller } from '@nestjs/common';
import { ServicesTypeService } from './services-type.service';

@Controller('services-type')
export class ServicesTypeController {
  constructor(private readonly servicesTypeService: ServicesTypeService) {}
}
