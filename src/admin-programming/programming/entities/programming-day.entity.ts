import { Day } from 'src/admin-programming/day/entities/day.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { ProgrammingHours } from './programming-hours.entity';
import { ProgrammingSubscriptionDetail } from './programming-subscription-detail.entity';

@Entity()
export class ProgrammingDay extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  programmingDayId: string;

  @ManyToOne(() => Day, (day) => day.programmingDay)
  day: Day;

  @OneToMany(
    () => ProgrammingHours,
    (programmingHours) => programmingHours.programmingDay,
  )
  hours: ProgrammingHours[];

  @ManyToOne(() => ProgrammingSubscriptionDetail, (psd) => psd.programmingDay)
  programmingSubscriptionDetail: ProgrammingSubscriptionDetail;
}
