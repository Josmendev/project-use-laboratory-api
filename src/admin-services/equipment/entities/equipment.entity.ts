import { LaboratoryEquipment } from 'src/admin-services/laboratories/entities/laboratory-equipment.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EquipmentResources } from './equipment-resources.entity';

@Entity()
export class Equipment extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  equipmentId: string;

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

  @OneToMany(
    () => LaboratoryEquipment,
    (laboratoryEquipe) => laboratoryEquipe.equipment,
  )
  laboratoryEquipment: LaboratoryEquipment[];

  @OneToMany(
    () => EquipmentResources,
    (equipmentResources) => equipmentResources.equipment,
  )
  equipmentResources: EquipmentResources[];
}
