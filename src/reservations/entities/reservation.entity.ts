import { Subscriber } from 'src/admin-subscriptions/subscribers/entities/subscriber.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationLaboratoryEquipment } from './reservation-laboratory-equipment.entity';

@Entity()
export class Reservation extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  reservationId: string;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.reservation)
  subscriber: Subscriber;

  @OneToMany(
    () => ReservationLaboratoryEquipment,
    (reservationLaboratoryEquipe) => reservationLaboratoryEquipe.reservation,
  )
  reservationLaboratoryEquipment: ReservationLaboratoryEquipment[];

  @Column({
    type: 'json',
    nullable: false,
  })
  metadata: Record<string, any>;
}
