import { Equipment } from '../../../admin-services/equipment/entities/equipment.entity';
import { Attribute } from '../../../admin-services/attributes/entities/attribute.entity';

export interface SeedEquipmentResource {
  equipmentResourcesId: string;
  description: string;
  equipment: Equipment;
  attribute: Attribute;
  isActive: boolean;
}
