export class LaboratoryDisponibilityResponseDto {
  laboratoryId: string;
  description: string;
  operationTime: Array<{ start: string; end: string }>;
  resources: (string | undefined)[];
}
