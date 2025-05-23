import { SubscriberRole } from 'src/admin-subscriptions/subscribers/entities/subscriber-role.entity';
import { Timestamped } from 'src/common/entities/timestamped.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role extends Timestamped {
  @PrimaryGeneratedColumn('uuid')
  roleId: string;

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

  @OneToMany(() => SubscriberRole, (subscriberRole) => subscriberRole.role)
  subscriberRoles: SubscriberRole[];
}
