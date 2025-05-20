import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Laboratory } from './laboratory.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Equipment } from 'src/admin-services/equipment/entities/equipment.entity';
import { ReservationLaboratoryEquipment } from 'src/reservations/entities/reservation-laboratory-equipment.entity';

@Entity()
export class LaboratoryEquipment extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  laboratoryEquipeId: string;

  @ManyToOne(() => Laboratory, (laboratory) => laboratory.laboratoryEquipment)
  laboratory: Laboratory;

  @Column({
    type: 'integer',
    nullable: false,
  })
  quantity: number;

  @ManyToOne(() => Equipment, (equipment) => equipment.laboratoryEquipment)
  equipment: Equipment;

  @OneToMany(
    () => ReservationLaboratoryEquipment,
    (reservationLaboratoryEquipe) =>
      reservationLaboratoryEquipe.laboratoryEquipment,
  )
  reservationLaboratoryEquipment: ReservationLaboratoryEquipment[];
}
