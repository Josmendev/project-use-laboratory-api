import { NaturalPersonResponseDto } from 'src/admin-persons/natural-persons/dto/natural-person-response.dto';
import { ParameterResponseDto } from 'src/admin-subscriptions/parameters/dto/parameter-response.dto';
import { StatusSubscription } from 'src/admin-subscriptions/subscriptions/enums/status-subscription.enum';
import { SubscriptionsDesigneSettingsResponseDto } from '../../admin-subscriptions/subscriptions-designe-settings/dto/subscriptions-designe-settings-response.dto';

export class ValidateUserResponseDto {
  subscriberId: string;
  username: string;
  roles: string[];
  naturalPerson: NaturalPersonResponseDto;
  subscription: {
    subscriptionId: string;
    status: StatusSubscription;
    initialDate: string;
    finalDate: string;
    parameter: ParameterResponseDto;
    subscriptionDesign: SubscriptionsDesigneSettingsResponseDto;
    person: any;
  };
}
