import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subscription } from './subscription.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';

@Entity()
export class SubscriptionDetail extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  subscriptionDetailId: string;

  @ManyToOne(
    () => Subscription,
    (subscription) => subscription.subscriptionDetail,
  )
  subscription: Subscription;

  service: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  accountsNumber: number;
}
