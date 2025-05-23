import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subscriber } from './subscriber.entity';
import { Role } from 'src/admin-subscriptions/roles/entities/role.entity';

@Entity()
export class SubscriberRole {
  @PrimaryGeneratedColumn('uuid')
  subscriberRoleId: string;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.subscriberRoles)
  subscriber: Subscriber;

  @ManyToOne(() => Role, (role) => role.subscriberRoles)
  role: Role;
}
