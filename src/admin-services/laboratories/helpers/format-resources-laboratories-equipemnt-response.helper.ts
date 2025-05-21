import { LaboratoryEquipment } from '../entities/laboratory-equipment.entity';
import { ResourcesLaboratoryResponse } from '../interfaces/resources-laboratories-response.interface';

export const formatResourcesLaboratoryEquipmentResponse = (
  laboratoryEquipment: LaboratoryEquipment,
): ResourcesLaboratoryResponse => {
  return {
    laboratoryEquipmentId: laboratoryEquipment.laboratoryEquipeId,
    laboratoryId: laboratoryEquipment.laboratory.laboratoryId,
    systemSpecifications: laboratoryEquipment.equipment.equipmentResources.map(
      (er) => ({
        attribute: er.attribute.description,
        resource: er.description,
      }),
    ),
  };
};
