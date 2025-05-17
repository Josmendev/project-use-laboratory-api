import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';
import { InformationType } from 'src/admin-persons/information-type/entities/information-type.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';

@Entity()
export class PersonInformation extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  personInformationId: string;

  @ManyToOne(() => Person, (person) => person.personInformation)
  person: Person;

  @ManyToOne(
    () => InformationType,
    (informationType) => informationType.personInformation,
  )
  informationType: InformationType;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
