import { Module } from '@nestjs/common';
import { AttributesTypeService } from './attributes-type.service';
import { AttributesTypeController } from './attributes-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesType } from './entities/attributes-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttributesType])],
  controllers: [AttributesTypeController],
  providers: [AttributesTypeService],
})
export class AttributesTypeModule {}
