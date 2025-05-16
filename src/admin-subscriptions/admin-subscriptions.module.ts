import { Module } from '@nestjs/common';
import { ParametersModule } from './parameters/parameters.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SubscriptionsTypeModule } from './subscriptions-type/subscriptions-type.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [ParametersModule, SubscriptionsModule, SubscriptionsTypeModule, SubscribersModule, RolesModule]
})
export class AdminSubscriptionsModule {}
