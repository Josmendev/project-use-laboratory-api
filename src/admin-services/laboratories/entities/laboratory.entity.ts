import { Service } from 'src/admin-services/services/entities/service.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Laboratory extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  laboratoryId: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  description: string;

  @OneToOne(() => Service, (service) => service.laboratory)
  @JoinColumn()
  service: Service;

  @Column({
    type: 'integer',
    nullable: false,
  })
  capacity: number;

  @Column({
    type: 'json',
    nullable: false,
  })
  metadata: Record<string, any>;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
