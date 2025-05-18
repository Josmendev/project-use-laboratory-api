import { AttributesType } from 'src/admin-services/attributes-type/entities/attributes-type.entity';
import { EquipmentResources } from 'src/admin-services/equipment/entities/equipment-resources.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Attribute extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  attributeId: string;

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
    () => EquipmentResources,
    (equipmentResources) => equipmentResources.attribute,
  )
  equipmentResources: EquipmentResources[];

  @ManyToOne(
    () => AttributesType,
    (attributesType) => attributesType.attributes,
  )
  attributesType: AttributesType;
}
