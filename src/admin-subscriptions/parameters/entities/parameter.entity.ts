import { Subscription } from 'src/admin-subscriptions/subscriptions/entities/subscription.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Parameter extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  parameterId: string;

  @OneToOne(() => Subscription, (subscription) => subscription.parameters)
  @JoinColumn()
  subscription: Subscription;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  numberReservationDay: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  miniumNumberMinutes: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  rangeBetweenReservations: number;
}
