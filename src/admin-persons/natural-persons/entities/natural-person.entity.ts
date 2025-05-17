import { Person } from 'src/admin-persons/persons/entities/person.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class NaturalPerson extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  naturalPersonId: string;

  @OneToOne(() => Person, (person) => person.naturalPerson)
  @JoinColumn()
  person: Person;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  paternalSurname: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  maternalSurname: string;
}
