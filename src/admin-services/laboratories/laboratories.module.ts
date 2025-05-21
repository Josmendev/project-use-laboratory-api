import { Module } from '@nestjs/common';
import { LaboratoriesController } from './laboratories.controller';
import { LaboratoriesService } from './services/laboratories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratory } from './entities/laboratory.entity';
import { LaboratoryEquipment } from './entities/laboratory-equipment.entity';
import { LaboratoryTechnicalSupport } from './entities/laboratory-technical-support.entity';
import { SubscribersModule } from 'src/admin-subscriptions/subscribers/subscribers.module';
import { AuthModule } from 'src/auth/auth.module';
import { LaboratoryEquipeService } from './services/laboraty-equipe.service';
import { ProgrammingModule } from 'src/admin-programming/programming/programming.module';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Laboratory,
      LaboratoryEquipment,
      LaboratoryTechnicalSupport,
    ]),
    SubscribersModule,
    ProgrammingModule,
    ReservationsModule,
    AuthModule,
  ],
  controllers: [LaboratoriesController],
  providers: [LaboratoriesService, LaboratoryEquipeService],
})
export class LaboratoriesModule {}
