import { Controller } from '@nestjs/common';
import { SubscribersService } from './services/subscribers.service';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}
}
