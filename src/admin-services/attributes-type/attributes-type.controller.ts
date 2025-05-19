import { Controller } from '@nestjs/common';
import { AttributesTypeService } from './attributes-type.service';

@Controller('attributes-type')
export class AttributesTypeController {
  constructor(private readonly attributesTypeService: AttributesTypeService) {}
}
