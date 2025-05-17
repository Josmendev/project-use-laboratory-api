import { JuridicalPerson } from 'src/admin-persons/juridical-persons/entities/juridical-person.entity';
import { NaturalPerson } from 'src/admin-persons/natural-persons/entities/natural-person.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonInformation } from './person-information.entity';

@Entity()
export class Person extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  idPerson: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
    unique: true,
  })
  documentNumber: string;

  @OneToOne(() => NaturalPerson, (person) => person.person)
  naturalPerson: NaturalPerson;

  @OneToOne(() => JuridicalPerson, (person) => person.person)
  juridicalPerson: JuridicalPerson;

  @OneToMany(
    () => PersonInformation,
    (personInformation) => personInformation.person,
  )
  personInformation: PersonInformation[];

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
