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
      .leftJoinAndSelect('subscriber.subscription', 'subscription')
      .leftJoinAndSelect('subscriber.person', 'personSubscriber')
      .leftJoinAndSelect('subscription.parameter', 'parameter')
      .leftJoinAndSelect('subscription.person', 'personSubscription')
      .leftJoinAndSelect('person.documentIdentityType', 'documentIdentityType')
      .leftJoinAndSelect('person.juridicalPerson', 'juridicalPerson')
      .leftJoinAndSelect('person.informationPerson', 'informationPerson')
      .leftJoinAndSelect('informationPerson.informationType', 'informationType')
      .leftJoinAndSelect('subscriber.subscriberRole', 'subscriberRole')
      .leftJoinAndSelect('subscriberRole.role', 'role')
      .where('subscriber.subscriberId = :subscriberId', { subscriberId });
    const subscriber = await queryBuilder.getOne();
    return subscriber;
  }
}
