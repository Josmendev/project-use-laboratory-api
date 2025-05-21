import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationLaboratoryEquipment } from './entities/reservation-laboratory-equipment.entity';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, ReservationLaboratoryEquipment]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [
    ReservationsService,
    TypeOrmModule.forFeature([Reservation, ReservationLaboratoryEquipment]),
  ],
})
export class ReservationsModule {}
