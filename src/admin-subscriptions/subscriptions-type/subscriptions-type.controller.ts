import { Controller } from '@nestjs/common';
import { SubscriptionsTypeService } from './subscriptions-type.service';

@Controller('subscriptions-type')
export class SubscriptionsTypeController {
  constructor(
    private readonly subscriptionsTypeService: SubscriptionsTypeService,
  ) {}
}
