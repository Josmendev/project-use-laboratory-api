import { PersonsType } from '../../admin-persons/persons-type/entities/persons-type.entity';
import { DocumentIdentityType } from '../../admin-persons/document-identity-type/entities/document-identity-type.entity';

export interface SeedPersonType {
  personTypeId: string;
  description: string;
  isActive: boolean;
}
