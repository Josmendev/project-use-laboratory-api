import { Module } from '@nestjs/common';
import { ProgrammingController } from './programming.controller';
import { ProgrammingService } from './services/programming.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programming } from './entities/programming.entity';
import { ProgrammingSubscriptionDetail } from './entities/programming-subscription-detail.entity';
import { ProgrammingDay } from './entities/programming-day.entity';
import { ProgrammingHours } from './entities/programming-hours.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Programming,
      ProgrammingSubscriptionDetail,
      ProgrammingDay,
      ProgrammingHours,
    ]),
  ],
  controllers: [ProgrammingController],
  providers: [ProgrammingService],
})
export class ProgrammingModule {}
