import { Person } from '../../../admin-persons/persons/entities/person.entity';
import { StatusSubscription } from '../../../admin-subscriptions/subscriptions/enums/status-subscription.enum';
import { SubscriptionsType } from '../../../admin-subscriptions/subscriptions-type/entities/subscriptions-type.entity';

export interface SeedSubscription {
  subscriptionId: string;
  initialDate: Date;
  finalDate: Date;
  contractSigningDate: Date;
  person: Person;
  subscriptionType: SubscriptionsType;
  status: StatusSubscription;
}
