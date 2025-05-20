import { SeedPersonType } from './seed-person-type.interface';
import { SeedNaturalPerson } from './seed-natural-person.interface';
import { SeedJuridicalPerson } from './seed-juridical-person.interface';
import { SeedDay } from './seed-day.interface';
import { SeedServiceType } from './seed-service-type.interface';
import { SeedSubscriptionType } from './seed-subscription-type.interface';
import { SeedService } from './seed-service.interface';
import { SeedDocumentIdentityType } from './seed-document_identity_type.interface';

export interface SeedData {
  personTypes: SeedPersonType[];
  documentIdentityType: SeedDocumentIdentityType[];
  naturalPersons: SeedNaturalPerson[];
  juridicalPersons: SeedJuridicalPerson[];
  days: SeedDay[];
  serviceTypes: SeedServiceType[];
  services: SeedService[];
  subscriptionTypes: SeedSubscriptionType[];
}
