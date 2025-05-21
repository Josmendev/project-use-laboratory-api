export interface EquipmentAvailableResponse {
  equipmentId: string;
  description: string;
  quantity: number;
  availableQuantity: number;
  isAvailable: boolean;
  resources: string[];
}
