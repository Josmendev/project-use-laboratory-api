import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
  ) {}

  // Internal helpers methods
  async findOneByUsername(
    username: string,
    url: string,
  ): Promise<Subscriber | null> {
    const queryBuilder =
      this.subscriberRepository.createQueryBuilder('subscriber');
    queryBuilder
      .leftJoinAndSelect('subscriber.subscription', 'subscription')
      .leftJoinAndSelect(
        'subscription.subscriptionsDesigneSetting',
        'subscriptionsDesigneSetting',
      )
      .where('subscriber.username = :username', { username })
      .andWhere('subscriptionsDesigneSetting.url = :url', {
        url,
      });
    const subscriber = await queryBuilder.getOne();
    return subscriber;
  }

  async findOneBySubscriberId(
    subscriberId: string,
  ): Promise<Subscriber | null> {
    const queryBuilder =
      this.subscriberRepository.createQueryBuilder('subscriber');
    queryBuilder
      // subscriber relations
      .leftJoinAndSelect('subscriber.subscription', 'subscription')
      .leftJoinAndSelect('subscriber.naturalPerson', 'naturalPerson')
      .leftJoinAndSelect('naturalPerson.person', 'subscriberPerson')
      .leftJoinAndSelect(
        'subscriberPerson.personInformation',
        'personInformation',
      )
      .leftJoinAndSelect('personInformation.informationType', 'informationType')
      // subscription relations
      .leftJoinAndSelect('subscription.parameters', 'parameters')
      .leftJoinAndSelect('subscription.person', 'person')
      .leftJoinAndSelect('person.documentIdentityType', 'documentIdentityType')
      .leftJoinAndSelect('person.personType', 'personType')
      .leftJoinAndSelect(
        'person.naturalPerson',
        'naturalPersonSubscription',
        'personType.description = :naturalTypeName',
        { naturalTypeName: 'Persona natural' },
      )
      .leftJoinAndSelect(
        'person.juridicalPerson',
        'juridicalPerson',
        'personType.description = :juridicalTypeName',
        { juridicalTypeName: 'Persona jurídica' },
      )
      // roles
      .leftJoinAndSelect('subscriber.subscriberRoles', 'subscriberRoles')
      .leftJoinAndSelect('subscriberRoles.role', 'role')
      .where('subscriber.subscriberId = :subscriberId', { subscriberId });
    const subscriber = await queryBuilder.getOne();
    console.log(subscriber);
    return subscriber;
  }
}
