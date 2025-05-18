import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionsDesigneSettingDto } from './create-subscriptions-designe-setting.dto';

export class UpdateSubscriptionsDesigneSettingDto extends PartialType(CreateSubscriptionsDesigneSettingDto) {}
