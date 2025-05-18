import { Column, ManyToOne } from 'typeorm';
import { ProgrammingDay } from './programming-day.entity';
export class ProgrammingHours {
  programmingHoursId: string;

  @ManyToOne(() => ProgrammingDay, (programmingDay) => programmingDay.hours)
  programmingDay: ProgrammingDay;

  @Column({
    type: 'time',
    length: 12,
    nullable: false,
  })
  initialHour;

  @Column({
    type: 'time',
    length: 12,
    nullable: false,
  })
  finalHour;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
