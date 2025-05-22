import { forwardRef, Module } from '@nestjs/common';
import { ProgrammingController } from './programming.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { ProgrammingSubscriptionDetail } from './entities/programming-subscription-detail.entity';
import { ProgrammingDay } from './entities/programming-day.entity';
import { ProgrammingHours } from './entities/programming-hours.entity';
import { ProgrammingHoursService } from './services/programming-hours.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgrammingSubscriptionDetail,
      ProgrammingDay,
      ProgrammingHours,
    ]),
    forwardRef(() => ReservationsModule),
  ],
  controllers: [ProgrammingController],
  providers: [ProgrammingHoursService],
  exports: [ProgrammingHoursService],
})
export class ProgrammingModule {}
