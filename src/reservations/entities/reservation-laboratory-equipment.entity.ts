import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { LaboratoryEquipment } from 'src/admin-services/laboratories/entities/laboratory-equipment.entity';
import { StatusReservation } from '../enums/status-reservation.enum';

@Entity()
export class ReservationLaboratoryEquipment {
  @PrimaryGeneratedColumn('uuid')
  reservationLaboratoryEquipeId: string;

  @ManyToOne(
    () => Reservation,
    (reservation) => reservation.reservationLaboratoryEquipment,
  )
  reservation: Reservation;

  @ManyToOne(
    () => LaboratoryEquipment,
    (laboratoryEquipment) => laboratoryEquipment.reservationLaboratoryEquipment,
  )
  laboratoryEquipment: LaboratoryEquipment;

  @Column({
    type: 'date',
    nullable: false,
  })
  reservationDate: Date;

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
    type: 'json',
    nullable: false,
  })
  metadata: Record<string, any>;

  @Column({
    type: 'enum',
    enum: StatusReservation,
    nullable: false,
  })
  status: StatusReservation;
}
