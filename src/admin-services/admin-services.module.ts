import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { ServicesTypeModule } from './services-type/services-type.module';
import { LaboratoriesModule } from './laboratories/laboratories.module';
import { EquipmentModule } from './equipment/equipment.module';
import { AttributesModule } from './attributes/attributes.module';
import { AttributesTypeModule } from './attributes-type/attributes-type.module';
import { TechnicalSupportModule } from './technical-support/technical-support.module';

@Module({
  imports: [ServicesModule, ServicesTypeModule, LaboratoriesModule, EquipmentModule, AttributesModule, AttributesTypeModule, TechnicalSupportModule]
})
export class AdminServicesModule {}
