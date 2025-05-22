import { LaboratoryEquipment } from '../entities/laboratory-equipment.entity';
import { SummaryLaboratoryEquipmentResponse } from '../interfaces/summary-laboratories-equipment.interface';

export const formatSummaryLaboratoryEquipmentResponse = (
  laboratoryEquipment: LaboratoryEquipment,
): SummaryLaboratoryEquipmentResponse => {
  return {
    laboratoryEquipmentId: laboratoryEquipment.laboratoryEquipeId,
    laboratory: laboratoryEquipment.laboratory.description,
    equipment: laboratoryEquipment.equipment.description,
  };
};
