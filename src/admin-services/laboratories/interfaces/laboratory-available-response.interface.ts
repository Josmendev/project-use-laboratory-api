import { EquipmentAvailableResponse } from './equipment-available-response.interface';

export interface LaboratoryAvailableResponse {
  laboratoryId: string;
  description: string;
  equipment: EquipmentAvailableResponse[];
}
