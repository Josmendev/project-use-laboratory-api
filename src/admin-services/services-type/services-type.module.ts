import { Module } from '@nestjs/common';
import { ServicesTypeService } from './services-type.service';
import { ServicesTypeController } from './services-type.controller';

@Module({
  controllers: [ServicesTypeController],
  providers: [ServicesTypeService],
})
export class ServicesTypeModule {}
