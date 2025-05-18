import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Laboratory } from './laboratory.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Equipment } from 'src/admin-services/equipment/entities/equipment.entity';

@Entity()
export class LaboratoryEquipment extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  laboratoryEquipeId: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  laboratory: Laboratory;

  @Column({
    type: 'integer',
    nullable: false,
  })
  quantity: number;

  @ManyToOne(() => Equipment, (equipment) => equipment.laboratoryEquipment)
  equipment: Equipment;
}
