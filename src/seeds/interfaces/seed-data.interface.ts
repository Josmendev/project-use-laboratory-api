import { SeedPersonType } from './seed-person-type.interface';
import { SeedNaturalPerson } from './seed-natural-person.interface';
import { SeedJuridicalPerson } from './seed-juridical-person.interface';
import { SeedDay } from './seed-day.interface';
import { SeedServiceType } from './seed-service-type.interface';
import { SeedSubscriptionType } from './seed-subscription-type.interface';
import { SeedDocumentIdentityType } from './seed-document_identity_type.interface';

import { SeedAttributeType } from './admin-services/seed-attribute-type.interface';
import { SeedAttribute } from './admin-services/seed-attribute.interface';
import { SeedEquipment } from './admin-services/seed-equipment.interface';
import { SeedLaboratory } from './admin-services/seed-laboratory.interface';

export interface SeedData {
  personTypes: SeedPersonType[];
  documentIdentityType: SeedDocumentIdentityType[];
  naturalPersons: SeedNaturalPerson[];
  juridicalPersons: SeedJuridicalPerson[];
  days: SeedDay[];
  serviceTypes: SeedServiceType[];
  subscriptionTypes: SeedSubscriptionType[];
  attributeTypes: SeedAttributeType[];
  attributes: SeedAttribute[];
  equipments: SeedEquipment[];
  laboratories: SeedLaboratory[];
  // seedLaboratoryEquipments: SeedLaboratoryEquipment[];
}
