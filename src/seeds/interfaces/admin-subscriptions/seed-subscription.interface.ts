import { Person } from '../../../admin-persons/persons/entities/person.entity';
import { StatusSubscription } from '../../../admin-subscriptions/subscriptions/enums/status-subscription.enum';

export interface SeedSubscription {
  subscriptionId: string;
  initialDate: Date;
  finalDate: Date;
  contractSigningDate: Date;
  person: Person;
  status: StatusSubscription;
}
