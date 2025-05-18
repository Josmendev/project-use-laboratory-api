import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subscription } from './subscription.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { ProgrammingSubscriptionDetail } from 'src/admin-programming/programming/entities/programming-subscription-detail.entity';

@Entity()
export class SubscriptionDetail extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  subscriptionDetailId: string;

  @ManyToOne(
    () => Subscription,
    (subscription) => subscription.subscriptionDetail,
  )
  subscription: Subscription;

  @OneToMany(
    () => ProgrammingSubscriptionDetail,
    (programmingSubscriptionDetail) =>
      programmingSubscriptionDetail.subscriptionDetail,
  )
  programmingSubscriptionDetail: ProgrammingSubscriptionDetail[];

  service: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  accountsNumber: number;
}
