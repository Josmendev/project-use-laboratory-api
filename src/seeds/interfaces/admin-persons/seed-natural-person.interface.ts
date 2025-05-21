import { Person } from '../../../admin-persons/persons/entities/person.entity';
import { PersonsType } from '../../../admin-persons/persons-type/entities/persons-type.entity';
import { DocumentIdentityType } from '../../../admin-persons/document-identity-type/entities/document-identity-type.entity';

export interface SeedNaturalPerson {
  idPerson: string;
  documentNumber: string;
  naturalPersonId: string;
  fullName: string;
  paternalSurname: string;
  maternalSurname: string;
  person: Person;
  personType: PersonsType;
  documentIdentityType: DocumentIdentityType;
  isActive: boolean;
}
