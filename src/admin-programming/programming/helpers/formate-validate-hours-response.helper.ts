import { LaboratoryDisponibilityResponseDto } from 'src/admin-services/laboratories/dto/laboratories-disponibility-response.dto';

export const formatValidateHoursResponse = (
  slot: any,
): LaboratoryDisponibilityResponseDto[] => {
  return slot.laboratoryEquipment.map((le: any) => ({
    laboratoryEquipmentId: le.laboratoryEquipeId, // ID de la relación
    laboratoryId: slot.laboratory.laboratoryId,
    description: slot.laboratory.description,
    operationTime: [
      {
        start: slot.initialHour,
        end: slot.finalHour,
      },
    ],
    resources: le.equipment.equipmentResources.map((er: any) => er.description),
  }));
};
