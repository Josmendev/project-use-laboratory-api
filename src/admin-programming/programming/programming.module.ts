import { Module } from '@nestjs/common';
import { ProgrammingController } from './programming.controller';
import { ProgrammingService } from './services/programming.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programming } from './entities/programming.entity';
import { ProgrammingSubscriptionDetail } from './entities/programming-subscription-detail.entity';
import { ProgrammingDay } from './entities/programming-day.entity';
import { ProgrammingHours } from './entities/programming-hours.entity';
import { ProgrammingHoursService } from './services/programming-hours.service';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Programming,
      ProgrammingSubscriptionDetail,
      ProgrammingDay,
      ProgrammingHours,
    ]),
    ReservationsModule,
  ],
  controllers: [ProgrammingController],
  providers: [ProgrammingService, ProgrammingHoursService],
  exports: [ProgrammingHoursService],
})
export class ProgrammingModule {}
