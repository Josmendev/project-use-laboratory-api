import { Service } from 'src/admin-services/services/entities/service.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LaboratoryTechnicalSupport } from './laboratory-technical-support.entity';
import { LaboratoryEquipment } from './laboratory-equipment.entity';

@Entity()
export class Laboratory extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  laboratoryId: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  description: string;

  @OneToOne(() => Service, (service) => service.laboratory)
  @JoinColumn()
  service: Service;

  @OneToMany(
    () => LaboratoryEquipment,
    (laboratoryEquipment) => laboratoryEquipment.laboratory,
  )
  laboratoryEquipment: LaboratoryEquipment[];

  @OneToMany(
    () => LaboratoryTechnicalSupport,
    (laboratoryTechnicalSupport) => laboratoryTechnicalSupport.laboratory,
  )
  laboratoryTechnicalSupport: LaboratoryTechnicalSupport[];

  @Column({
    type: 'integer',
    nullable: false,
  })
  capacity: number;

  @Column({
    type: 'json',
    nullable: false,
  })
  metadata: Record<string, any>;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
