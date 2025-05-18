import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Equipment } from './equipment.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Attribute } from 'src/admin-services/attributes/entities/attribute.entity';

@Entity()
export class EquipmentResources extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  equipmentResourcesId: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  description: string;

  @ManyToOne(() => Equipment, (equipment) => equipment.equipmentResources)
  equipment: Equipment;

  @ManyToOne(() => Attribute, (attribute) => attribute.equipmentResources)
  attribute: Attribute;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
