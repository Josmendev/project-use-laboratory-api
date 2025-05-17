import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonsType extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  personTypeId: string;

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
}
