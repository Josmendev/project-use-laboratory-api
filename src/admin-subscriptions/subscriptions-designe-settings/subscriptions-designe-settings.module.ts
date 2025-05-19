import { Module } from '@nestjs/common';
import { SubscriptionsDesigneSettingsService } from './subscriptions-designe-settings.service';
import { SubscriptionsDesigneSettingsController } from './subscriptions-designe-settings.controller';
import { SubscriptionsDesigneSetting } from './entities/subscriptions-designe-setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionsDesigneSetting])],
  controllers: [SubscriptionsDesigneSettingsController],
  providers: [SubscriptionsDesigneSettingsService],
})
export class SubscriptionsDesigneSettingsModule {}
