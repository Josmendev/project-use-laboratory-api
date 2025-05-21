import { SlotAvailableResponse } from './slots-available-response.interface';

export interface ResultAvailableResponse {
  date: string;
  dayOfWeek: string;
  availableSlots: SlotAvailableResponse[];
  totalAvailable: number;
}
