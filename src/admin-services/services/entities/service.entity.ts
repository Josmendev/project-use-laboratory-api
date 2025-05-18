import { Laboratory } from 'src/admin-services/laboratories/entities/laboratory.entity';
import { ServicesType } from 'src/admin-services/services-type/entities/services-type.entity';
import { SubscriptionDetail } from 'src/admin-subscriptions/subscriptions/entities/subscriptionDetail.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Service extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  serviceId: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  description: string;

  @ManyToOne(() => ServicesType, (servicesType) => servicesType.services)
  serviceType: ServicesType;

  @OneToOne(() => Laboratory, (laboratory) => laboratory.service)
  laboratory: Laboratory;

  @OneToMany(
    () => SubscriptionDetail,
    (subscriptionDetail) => subscriptionDetail.service,
  )
  subscriptionDetail: SubscriptionDetail[];
}
