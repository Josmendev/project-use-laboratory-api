import { Module } from '@nestjs/common';
import { SubscriptionsDesigneSettingsService } from './subscriptions-designe-settings.service';
import { SubscriptionsDesigneSettingsController } from './subscriptions-designe-settings.controller';

@Module({
  controllers: [SubscriptionsDesigneSettingsController],
  providers: [SubscriptionsDesigneSettingsService],
})
export class SubscriptionsDesigneSettingsModule {}
