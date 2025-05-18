import { Service } from 'src/admin-services/services/entities/service.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServicesType extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  serviceTypeId: string;

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

  @OneToMany(() => Service, (service) => service.serviceType)
  services: Service[];
}
