import { JuridicalPerson } from 'src/admin-persons/juridical-persons/entities/juridical-person.entity';
import { NaturalPerson } from 'src/admin-persons/natural-persons/entities/natural-person.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonInformation } from './person-information.entity';
import { Subscription } from 'src/admin-subscriptions/subscriptions/entities/subscription.entity';
import { DocumentIdentityType } from 'src/admin-persons/document-identity-type/entities/document-identity-type.entity';

@Entity()
export class Person extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  personId: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
    unique: true,
  })
  documentNumber: string;

  @ManyToOne(
    () => DocumentIdentityType,
    (documentIdentityType) => documentIdentityType.person,
  )
  documentIdentityType: DocumentIdentityType;

  @OneToOne(() => NaturalPerson, (person) => person.person)
  naturalPerson: NaturalPerson;

  @OneToOne(() => JuridicalPerson, (person) => person.person)
  juridicalPerson: JuridicalPerson;

  @OneToMany(
    () => PersonInformation,
    (personInformation) => personInformation.person,
  )
  personInformation: PersonInformation[];

  @OneToMany(() => Subscription, (subscription) => subscription.person)
  subscriptions: Subscription[];

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
