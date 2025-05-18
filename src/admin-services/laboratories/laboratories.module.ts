import { Module } from '@nestjs/common';
import { LaboratoriesController } from './laboratories.controller';
import { LaboratoriesService } from './services/laboratories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratory } from './entities/laboratory.entity';
import { LaboratoryEquipment } from './entities/laboratory-equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratory, LaboratoryEquipment])],
  controllers: [LaboratoriesController],
  providers: [LaboratoriesService],
})
export class LaboratoriesModule {}
