import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './services/equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { EquipmentResources } from './entities/equipment-resources.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, EquipmentResources])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
