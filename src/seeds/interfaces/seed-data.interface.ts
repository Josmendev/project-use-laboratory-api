import { SeedPersonType } from './admin-persons/seed-person-type.interface';
import { SeedNaturalPerson } from './admin-persons/seed-natural-person.interface';
import { SeedJuridicalPerson } from './admin-persons/seed-juridical-person.interface';
import { SeedDay } from './admin-programming/seed-day.interface';
import { SeedServiceType } from './admin-services/seed-service-type.interface';
import { SeedDocumentIdentityType } from './admin-persons/seed-document_identity_type.interface';
import { SeedAttributeType } from './admin-services/seed-attribute-type.interface';
import { SeedAttribute } from './admin-services/seed-attribute.interface';
import { SeedEquipment } from './admin-services/seed-equipment.interface';
import { SeedLaboratory } from './admin-services/seed-laboratory.interface';
import { SeedSubscriptionType } from './admin-subscriptions/seed-subscription-type.interface';
import { SeedSubscription } from './admin-subscriptions/seed-subscription.interface';
import { SeedRole } from './admin-subscriptions/seed-role.interface';
import { SeedTechnicalSupport } from './admin-services/seed-technical-support';
import { SeedSubscriptionsDesigneSetting } from './admin-subscriptions/seed-subscriptions-designe-setting';
import { SeedSubscriber} from './admin-subscriptions/seed-subscriber.interface';

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
  subscriptions: SeedSubscription[];
  roles: SeedRole[];
  technicalSupports: SeedTechnicalSupport[];
  subscriptionsDesigneSettings: SeedSubscriptionsDesigneSetting[];
  subscriber: SeedSubscriber[];
}
