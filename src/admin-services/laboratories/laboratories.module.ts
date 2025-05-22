import { Module } from '@nestjs/common';
import { LaboratoriesController } from './laboratories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratory } from './entities/laboratory.entity';
import { LaboratoryEquipment } from './entities/laboratory-equipment.entity';
import { LaboratoryTechnicalSupport } from './entities/laboratory-technical-support.entity';
import { LaboratoriesService } from './services/laboratories.service';
import { LaboratoryEquipeService } from './services/laboraty-equipe.service';
import { SubscribersModule } from 'src/admin-subscriptions/subscribers/subscribers.module';
import { ProgrammingModule } from 'src/admin-programming/programming/programming.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Laboratory,
      LaboratoryEquipment,
      LaboratoryTechnicalSupport,
    ]),
    SubscribersModule,
    ProgrammingModule,
    AuthModule,
  ],
  controllers: [LaboratoriesController],
  providers: [LaboratoryEquipeService, LaboratoriesService],
  exports: [LaboratoryEquipeService, LaboratoriesService],
})
export class LaboratoriesModule {}
