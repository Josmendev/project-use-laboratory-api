import { Person } from 'src/admin-persons/persons/entities/person.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DocumentIdentityType extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  documentIdentityTypeId: string;

  @Column({
    type: 'varchar',
    length: 35,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 7,
    nullable: false,
  })
  abbreviation: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Person, (person) => person.documentIdentityType)
  person: Person[];
}
