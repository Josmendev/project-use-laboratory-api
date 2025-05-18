import { Day } from 'src/admin-programming/day/entities/day.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Programming } from './programming.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { ProgrammingHours } from './programming-hours.entity';

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

  @ManyToOne(() => Programming, (programming) => programming.programmingDay)
  programming: Programming;
}
