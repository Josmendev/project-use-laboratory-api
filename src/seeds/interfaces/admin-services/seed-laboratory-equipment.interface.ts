import { Laboratory } from '../../../admin-services/laboratories/entities/laboratory.entity';
import { Equipment } from '../../../admin-services/equipment/entities/equipment.entity';

export interface SeedLaboratoryEquipment {
  laboratoryEquipeId: string;
  laboratory: Laboratory;
  quantity: number;
  equipment: Equipment;
  isActive: boolean;
}
