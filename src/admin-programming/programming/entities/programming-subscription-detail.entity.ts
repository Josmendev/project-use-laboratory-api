import { SubscriptionDetail } from 'src/admin-subscriptions/subscriptions/entities/subscriptionDetail.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Programming } from './programming.entity';
import { StatusProgramming } from '../enums/status-programming.enum';
import { Timestamped } from 'src/common/entities/timestamped.entity';

@Entity()
export class ProgrammingSubscriptionDetail extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  programmingSubscriptionDetailId: string;

  @ManyToOne(
    () => SubscriptionDetail,
    (subscriptionDetail) => subscriptionDetail.programmingSubscriptionDetail,
  )
  subscriptionDetail: SubscriptionDetail;

  @ManyToOne(
    () => Programming,
    (programming) => programming.programmingSubscriptionDetail,
  )
  programming: Programming;

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
    type: 'json',
    nullable: false,
  })
  metadata: Record<string, any>;

  @Column({
    type: 'enum',
    enum: StatusProgramming,
    nullable: false,
  })
  status: StatusProgramming;
}
