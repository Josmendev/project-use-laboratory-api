import { Attribute } from 'src/admin-services/attributes/entities/attribute.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AttributesType extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  attributesTypeId: string;

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

  @OneToMany(() => Attribute, (attributes) => attributes.attributesType)
  attributes: Attribute[];
}
