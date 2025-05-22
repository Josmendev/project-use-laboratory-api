import { Subscriber } from 'src/admin-subscriptions/subscribers/entities/subscriber.entity';
import { ValidateUserResponseDto } from '../dto/validate-user-response.dto';
import { NaturalPersonResponseDto } from 'src/admin-persons/natural-persons/dto/natural-person-response.dto';
import { ParameterResponseDto } from 'src/admin-subscriptions/parameters/dto/parameter-response.dto';
import { generateTimeSlots } from 'src/admin-subscriptions/parameters/helpers/generate-time-slots.helper';
import { SubscriptionsDesigneSettingsResponseDto } from 'src/admin-subscriptions/subscriptions-designe-settings/dto/subscriptions-designe-settings-response.dto';
import { PersonSubscriptionResponseDto } from 'src/admin-persons/persons/dto/person-subscription-response.dto';

export const formatValidateUserResponse = (
  subscriber: Subscriber | null,
): ValidateUserResponseDto | null => {
  if (!subscriber) return null;

  // 1. Datos base del suscriptor
  const baseResponse = {
    subscriberId: subscriber.subscriberId,
    username: subscriber.username,
    roles: subscriber.subscriberRoles.map((role) => role.role.description),
  };

  // 2. Persona natural del SUSCRIPTOR (siempre carga)
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

  // 3. Parámetros de la suscripción
  const parameterResponse: ParameterResponseDto = {
    parameterId: subscriber.subscription?.parameters?.parameterId,
    description: subscriber.subscription?.parameters?.description,
    numberReservationDays:
      subscriber.subscription?.parameters?.numberReservationDay,
    maxiumNumberMinutes:
      subscriber.subscription?.parameters?.miniumNumberMinutes,
    rangeBetweenReservations:
      subscriber.subscription?.parameters?.rangeBetweenReservations,
    reservationTime: generateTimeSlots(
      subscriber.subscription?.parameters?.miniumNumberMinutes,
    ),
  };

  const subscriptionDesigneSetting =
    subscriber.subscription?.subscriptionsDesigneSetting;
  const subscriptionDesign: SubscriptionsDesigneSettingsResponseDto = {
    subscriptionsDesigneSettingId:
      subscriptionDesigneSetting?.subscribersDesigneSettingId,
    url: subscriptionDesigneSetting?.url,
    brandOne: subscriptionDesigneSetting?.brandOne,
    brandTwo: subscriptionDesigneSetting?.brandTwo,
    brandThree: subscriptionDesigneSetting?.brandThree,
    brandFour: subscriptionDesigneSetting?.brandFour,
    primaryColor: subscriptionDesigneSetting?.primaryColor,
    secondaryColor: subscriptionDesigneSetting?.secondaryColor,
    baseColor: subscriptionDesigneSetting?.baseColor,
    infoColor: subscriptionDesigneSetting?.infoColor,
    warningColor: subscriptionDesigneSetting?.warningColor,
    successColor: subscriptionDesigneSetting?.successColor,
    errorColor: subscriptionDesigneSetting?.errorColor,
    lightColor: subscriptionDesigneSetting?.lightColor,
    darkColor: subscriptionDesigneSetting?.darkColor,
    letterFont: subscriptionDesigneSetting?.letterFont,
  };

  // 4. Persona de la SUSCRIPCIÓN (condicional según joins)
  const subscriptionPerson = subscriber.subscription?.person;
  const subscriptionPersonResponse: PersonSubscriptionResponseDto = {
    personId: subscriptionPerson?.personId,
    // Datos específicos según el tipo
    ...(subscriptionPerson?.naturalPerson
      ? {
          fullName:
            subscriptionPerson.naturalPerson.fullName +
            ' ' +
            subscriptionPerson.naturalPerson.paternalSurname +
            ' ' +
            subscriptionPerson.naturalPerson.maternalSurname,
        }
      : subscriptionPerson?.juridicalPerson
        ? {
            fullName: subscriptionPerson.juridicalPerson.comercialName,
          }
        : { fullName: 'unknown' }),
  };

  // 5. Construcción final
  const validateUserResponse: ValidateUserResponseDto = {
    ...baseResponse,
    naturalPerson: naturalPersonResponse,
    subscription: {
      subscriptionId: subscriber.subscription?.subscriptionId,
      status: subscriber.subscription?.status,
      initialDate: subscriber.subscription?.initialDate?.toISOString(),
      finalDate: subscriber.subscription?.finalDate?.toISOString(),
      parameter: parameterResponse,
      subscriptionDesign,
      person: subscriptionPersonResponse,
    },
  };

  return validateUserResponse;
};
