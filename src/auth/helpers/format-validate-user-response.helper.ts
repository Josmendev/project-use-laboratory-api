import { Subscriber } from 'src/admin-subscriptions/subscribers/entities/subscriber.entity';
import { ValidateUserResponseDto } from '../dto/validate-user-response.dto';
import { NaturalPersonResponseDto } from 'src/admin-persons/natural-persons/dto/natural-person-response.dto';
import { ParameterResponseDto } from 'src/admin-subscriptions/parameters/dto/parameter-response.dto';

export const formatValidateUserResponse = (
  subscriber: Subscriber | null,
): ValidateUserResponseDto | null => {
  if (!subscriber) return null;

  const naturalPersonResponse: NaturalPersonResponseDto = {
    naturalPersonId: subscriber.naturalPerson?.naturalPersonId,
    personId: subscriber.naturalPerson?.person?.personId,
    fullName: subscriber.naturalPerson?.fullName,
    paternalSurname: subscriber.naturalPerson?.paternalSurname,
    maternalSurname: subscriber.naturalPerson?.maternalSurname,
    documentNumber: subscriber.naturalPerson?.person?.documentNumber,
    documentType:
      subscriber.naturalPerson?.person?.documentIdentityType?.description,
    personInformation:
      subscriber.naturalPerson?.person?.personInformation?.map((info) => ({
        informationType: info.informationType.description,
        description: info.description,
      })) || [],
  };

  const parameterResponse: ParameterResponseDto = {
    parameterId: subscriber.subscription?.parameters?.parameterId,
    description: subscriber.subscription?.parameters?.description,
    numberReservationDays:
      subscriber.subscription?.parameters?.numberReservationDay,
    miniumNumberMinutes:
      subscriber.subscription?.parameters?.miniumNumberMinutes,
    rangeBeetweenReservations:
      subscriber.subscription?.parameters?.rangeBetweenReservations,
  };

  const validateUserResponse: ValidateUserResponseDto = {
    subscriberId: subscriber.subscriberId,
    username: subscriber.username,
    naturalPerson: naturalPersonResponse,
    subscription: {
      subscriptionId: subscriber.subscription?.subscriptionId,
      status: subscriber.subscription?.status,
      initialDate: subscriber.subscription?.initialDate?.toISOString(),
      finalDate: subscriber.subscription?.finalDate?.toISOString(),
      parameter: parameterResponse,
    },
    role: subscriber.subscriberRoles.map((role) => role.role.description),
  };

  return validateUserResponse;
};
