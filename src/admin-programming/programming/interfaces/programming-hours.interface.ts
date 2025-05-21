import { ProgrammingHours } from '../entities/programming-hours.entity';

export interface ValidateHoursDisponibilityResult {
  slots: ProgrammingHours[];
  availableCount: number;
}

export interface AvailabilityCheckParams {
  laboratoryEquipeId: string;
  queryDateFormatted: string;
  initialHourString: string;
  finalHourString: string;
}

export interface SlotAvailability {
  slot: ProgrammingHours;
  isAvailable: boolean;
  availableQuantity: number;
}
