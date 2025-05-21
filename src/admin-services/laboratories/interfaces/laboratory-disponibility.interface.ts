import { Equipment } from 'src/admin-services/equipment/entities/equipment.entity';
import { LaboratoryEquipment } from '../entities/laboratory-equipment.entity';
import { Laboratory } from '../entities/laboratory.entity';
import { ReservationLaboratoryEquipment } from 'src/reservations/entities/reservation-laboratory-equipment.entity';

export interface OperationTime {
  start: string;
  end: string;
}

export interface EquipmentResource {
  description: string;
  attribute?: string;
}

export interface EquipmentAvailability {
  equipmentId: string;
  laboratoryEquipeId: string;
  description: string;
  quantity: number;
  availableQuantity: number;
  isAvailable: boolean;
  equipment: Equipment;
  resources: string[];
  isAvailableForReservation?: boolean; // Asegúrate de que el tipo sea correcto
  laboratory?: Laboratory; // Asegúrate de que el tipo Laboratory esté definido y sea correcto
  reservationLaboratoryEquipment?: ReservationLaboratoryEquipment[]; // Asegúrate de que el tipo ReservationLaboratoryEquipment esté definido y sea correcto
}

export interface LaboratoryWithAvailability {
  laboratoryId: string;
  description: string;
  equipment: EquipmentAvailability[];
}

export interface AvailableSlot {
  laboratoryId: string;
  laboratoryEquipment: LaboratoryEquipment; // Puedes tipar esto mejor si sabes su estructura exacta
  description: string;
  slotId: string;
  initialHour: string;
  finalHour: string;
  laboratory: LaboratoryWithAvailability;
}

export interface LaboratoryEquipmentResponse {
  laboratoryEquipmentId: string;
  laboratoryId: string;
  description: string;
  operationTime: OperationTime[];
  resources: string[];
  availableQuantity: number;
  totalQuantity: number;
}
