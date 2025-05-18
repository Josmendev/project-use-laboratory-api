import { Person } from 'src/admin-persons/persons/entities/person.entity';
import { Subscription } from 'src/admin-subscriptions/subscriptions/entities/subscription.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubscriberRole } from './subscriber-role.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';

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

  @OneToMany(() => Person, (person) => person.subscriber)
  person: Person;

  @OneToMany(() => Subscription, (subscription) => subscription.subscriber)
  subscription: Subscription;

  @Column({
    type: 'boolean',
    default: false,
  })
  isConfirm: boolean;

  @Column({
    type: 'varchar',
    length: 62,
    nullable: false,
  })
  token: string;

  @Column({
    type: 'varchar',
    length: 62,
    nullable: false,
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
