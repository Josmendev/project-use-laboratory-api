import { TechnicalSupport } from 'src/admin-services/technical-support/entities/technical-support.entity';
import { Laboratory } from './laboratory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Turn } from '../enums/turn.enum';
import { Timestamped } from 'src/common/entities/timestamped.entity';

@Entity()
export class LaboratoryTechnicalSupport extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  laboratoryTechnicalSupportId: string;

  @ManyToOne(
    () => Laboratory,
    (laboratory) => laboratory.laboratoryTechnicalSupport,
  )
  laboratory: Laboratory;

  @ManyToOne(
    () => TechnicalSupport,
    (technicalSupport) => technicalSupport.laboratoryTechnicalSupport,
  )
  technicalSupport: TechnicalSupport;

  @Column({
    type: 'enum',
    enum: Turn,
    nullable: false,
  })
  turn: Turn;
}
