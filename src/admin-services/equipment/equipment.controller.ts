import { Controller } from '@nestjs/common';
import { EquipmentService } from './services/equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
}
