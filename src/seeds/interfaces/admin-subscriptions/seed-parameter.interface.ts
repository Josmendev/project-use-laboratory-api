import { Subscription } from '../../../admin-subscriptions/subscriptions/entities/subscription.entity';

export interface SeedParameter {
  parameterId: string;
  subscription: Subscription;
  description: string;
  numberReservationDay: number;
  miniumNumberMinutes: number;
  rangeBetweenReservations: number;
}
