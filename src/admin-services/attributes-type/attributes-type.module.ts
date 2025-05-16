import { Module } from '@nestjs/common';
import { AttributesTypeService } from './attributes-type.service';
import { AttributesTypeController } from './attributes-type.controller';

@Module({
  controllers: [AttributesTypeController],
  providers: [AttributesTypeService],
})
export class AttributesTypeModule {}
