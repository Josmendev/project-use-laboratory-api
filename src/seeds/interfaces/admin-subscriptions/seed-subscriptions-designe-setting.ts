import { Subscription } from '../../../admin-subscriptions/subscriptions/entities/subscription.entity';

export interface SeedSubscriptionsDesigneSetting {
  subscribersDesigneSettingId: string;
  subscription: Subscription;
  url: string;
  brandOne: string;
  brandTwo: string;
  brandThree: string;
  brandFour: string;
  primaryColor: string;
  secondaryColor: string;
  baseColor: string;
  infoColor: string;
  warningColor: string;
  successColor: string;
  errorColor: string;
  lightColor: string;
  darkColor: string;
  letterFont: string;
}
