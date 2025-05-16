import { Module } from '@nestjs/common';
import { SubscriptionsTypeService } from './subscriptions-type.service';
import { SubscriptionsTypeController } from './subscriptions-type.controller';

@Module({
  controllers: [SubscriptionsTypeController],
  providers: [SubscriptionsTypeService],
})
export class SubscriptionsTypeModule {}
