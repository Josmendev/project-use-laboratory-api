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
export class JuridicalPerson extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  juridicalPersonId: string;

  @OneToOne(() => Person, (person) => person.juridicalPerson)
  @JoinColumn()
  person: Person;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  legalName: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  comercialName: string;
}
