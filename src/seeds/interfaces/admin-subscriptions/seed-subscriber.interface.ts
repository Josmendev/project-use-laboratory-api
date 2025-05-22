import { NaturalPerson } from '../../../admin-persons/natural-persons/entities/natural-person.entity';
import { Subscription } from '../../../admin-subscriptions/subscriptions/entities/subscription.entity';

export interface SeedSubscriber {
  subscriberId: string;
  username: string;
  password: string;
  naturalPerson: NaturalPerson;
  subscription: Subscription;
  isConfirm: boolean;
  token: string;
  refreshToken: string;
}
