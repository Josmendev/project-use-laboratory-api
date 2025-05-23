import { Person } from 'src/admin-persons/persons/entities/person.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { StatusSubscription } from '../enums/status-subscription.enum';
import { SubscriptionsType } from 'src/admin-subscriptions/subscriptions-type/entities/subscriptions-type.entity';
import { Parameter } from 'src/admin-subscriptions/parameters/entities/parameter.entity';
import { Subscriber } from 'src/admin-subscriptions/subscribers/entities/subscriber.entity';
import { SubscriptionDetail } from './subscriptionDetail.entity';
import { SubscriptionsDesigneSetting } from '../../subscriptions-designe-settings/entities/subscriptions-designe-setting.entity';

@Entity()
export class Subscription extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  subscriptionId: string;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  initialDate: Date;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  finalDate: Date;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  contractSigningDate: Date;

  @ManyToOne(() => Person, (person) => person.subscriptions)
  person: Person;

  @ManyToOne(
    () => SubscriptionsType,
    (subscriptionsType) => subscriptionsType.subscriptions,
  )
  subscriptionType: SubscriptionsType;

  @OneToOne(() => Parameter, (parameter) => parameter.subscription)
  parameters: Parameter;

  @OneToMany(() => Subscriber, (subscriber) => subscriber.subscription)
  subscriber: Subscriber[];

  @OneToMany(
    () => SubscriptionDetail,
    (subscriptionDetail) => subscriptionDetail.subscription,
  )
  subscriptionDetail: SubscriptionDetail[];

  @OneToOne(
    () => SubscriptionsDesigneSetting,
    (subscriptionsDesigneSetting) => subscriptionsDesigneSetting.subscription,
  )
  subscriptionsDesigneSetting: SubscriptionsDesigneSetting;

  @Column({
    type: 'enum',
    enum: StatusSubscription,
    nullable: false,
  })
  status: StatusSubscription;
}
