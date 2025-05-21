export interface ResourcesLaboratoryResponse {
  laboratoryEquipmentId: string;
  laboratoryId: string;
  systemSpecifications: {
    attribute: string;
    resource: string;
  }[];
}
