import { ProgrammingDay } from 'src/admin-programming/programming/entities/programming-day.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Day extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  dayId: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => ProgrammingDay, (programmingDay) => programmingDay.day)
  programmingDay: ProgrammingDay[];
}
