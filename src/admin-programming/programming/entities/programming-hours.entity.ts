import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProgrammingDay } from './programming-day.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';

@Entity()
export class ProgrammingHours extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  programmingHoursId: string;

  @ManyToOne(() => ProgrammingDay, (programmingDay) => programmingDay.hours)
  programmingDay: ProgrammingDay;

  @Column({
    type: 'time',
    nullable: false,
  })
  initialHour: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  finalHour: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
