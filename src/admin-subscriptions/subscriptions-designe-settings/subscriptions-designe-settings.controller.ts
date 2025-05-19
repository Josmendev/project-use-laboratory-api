import { Controller } from '@nestjs/common';
import { SubscriptionsDesigneSettingsService } from './subscriptions-designe-settings.service';

@Controller('subscriptions-designe-settings')
export class SubscriptionsDesigneSettingsController {
  constructor(
    private readonly subscriptionsDesigneSettingsService: SubscriptionsDesigneSettingsService,
  ) {}
}
