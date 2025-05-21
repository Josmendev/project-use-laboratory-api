import { OperationTime } from '../interfaces/operation-time.interface';

export class LaboratoryDisponibilityResponseDto {
  laboratoryId: string;
  description: string;
  operationTime: OperationTime[];
  resources: (string | undefined)[];
}
