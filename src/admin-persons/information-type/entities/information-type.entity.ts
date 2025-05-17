import { PersonInformation } from 'src/admin-persons/persons/entities/person-information.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InformationType extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  informationTypeId: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  required: boolean;

  @OneToMany(
    () => PersonInformation,
    (personInformation) => personInformation.informationType,
  )
  personInformation: PersonInformation[];

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
