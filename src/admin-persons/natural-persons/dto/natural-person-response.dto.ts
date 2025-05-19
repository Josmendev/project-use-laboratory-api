import { PersonInformationResponseDto } from 'src/admin-persons/persons/dto/person-information-response.dto';

export class NaturalPersonResponseDto {
  naturalPersonId: string;
  personId: string;
  fullName: string;
  paternalSurname: string;
  maternalSurname: string;
  documentNumber: string;
  documentType: string;
  personInformation: PersonInformationResponseDto[];
}
