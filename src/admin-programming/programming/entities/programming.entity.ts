import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { ProgrammingDay } from './programming-day.entity';
import { ProgrammingSubscriptionDetail } from './programming-subscription-detail.entity';

@Entity()
export class Programming extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  programmingId: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  description: string;

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
    type: 'boolean',
    nullable: true,
  })
  status: boolean;

  @OneToMany(
    () => ProgrammingDay,
    (programmingDay) => programmingDay.programming,
  )
  programmingDay: ProgrammingDay[];

  @OneToMany(
    () => ProgrammingSubscriptionDetail,
    (programmingSubscriptionDetail) =>
      programmingSubscriptionDetail.programming,
  )
  programmingSubscriptionDetail: ProgrammingSubscriptionDetail[];
}
