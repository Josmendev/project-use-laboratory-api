import { LaboratoryTechnicalSupport } from 'src/admin-services/laboratories/entities/laboratory-technical-support.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TechnicalSupport extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  technicalSupportId: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 11,
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
    unique: true,
  })
  documentNumber: string;

  @OneToMany(
    () => LaboratoryTechnicalSupport,
    (laboratoryTechnicalSupport) => laboratoryTechnicalSupport.technicalSupport,
  )
  laboratoryTechnicalSupport: LaboratoryTechnicalSupport[];

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
