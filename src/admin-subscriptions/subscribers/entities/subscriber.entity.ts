import { Subscription } from 'src/admin-subscriptions/subscriptions/entities/subscription.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubscriberRole } from './subscriber-role.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { NaturalPerson } from 'src/admin-persons/natural-persons/entities/natural-person.entity';

@Entity()
export class Subscriber extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  subscriberId: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 62,
    nullable: false,
  })
  password: string;

  @ManyToOne(() => NaturalPerson, (person) => person.subscriber)
  naturalPerson: NaturalPerson;

  @ManyToOne(() => Subscription, (subscription) => subscription.subscriber)
  subscription: Subscription;

  @Column({
    type: 'boolean',
    default: false,
  })
  isConfirm: boolean;

  @Column({
    type: 'varchar',
    length: 62,
    nullable: true,
  })
  token: string;

  @Column({
    type: 'varchar',
    length: 62,
    nullable: true,
  })
  refreshToken: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  metadata?: Record<string, any>;

  @OneToMany(
    () => SubscriberRole,
    (subscriberRole) => subscriberRole.subscriber,
  )
  subscriberRoles: SubscriberRole[];

  @OneToMany(() => Reservation, (reservation) => reservation.subscriber)
  reservation: Reservation;
}
