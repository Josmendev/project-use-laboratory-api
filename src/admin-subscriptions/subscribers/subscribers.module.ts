import { Module } from '@nestjs/common';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './services/subscribers.service';
import { Subscriber } from './entities/subscriber.entity';
import { SubscriberRole } from './entities/subscriber-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber, SubscriberRole])],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
