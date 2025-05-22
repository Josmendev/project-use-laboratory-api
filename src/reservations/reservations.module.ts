import { forwardRef, Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationLaboratoryEquipment } from './entities/reservation-laboratory-equipment.entity';
import { ReservationsService } from './services/reservations.service';
import { ReservationLaboratoryEquipmentService } from './services/reservation-laboratory-equipment.service';
import { SubscribersModule } from 'src/admin-subscriptions/subscribers/subscribers.module';
import { AuthModule } from 'src/auth/auth.module';
import { LaboratoriesModule } from 'src/admin-services/laboratories/laboratories.module';
import { ProgrammingModule } from 'src/admin-programming/programming/programming.module';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, ReservationLaboratoryEquipment]),
    forwardRef(() => ProgrammingModule),
    forwardRef(() => LaboratoriesModule),
    SubscribersModule,
    AuthModule,
    EmailsModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationLaboratoryEquipmentService],
  exports: [ReservationsService, ReservationLaboratoryEquipmentService],
})
export class ReservationsModule {}
