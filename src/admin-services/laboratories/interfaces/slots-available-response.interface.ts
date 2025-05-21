import { LaboratoryAvailableResponse } from './laboratory-available-response.interface';

export interface SlotAvailableResponse {
  slotId: string;
  initialHour: string;
  finalHour: string;
  laboratory: LaboratoryAvailableResponse;
}
