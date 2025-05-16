import { Module } from '@nestjs/common';
import { PersonsTypeService } from './persons-type.service';
import { PersonsTypeController } from './persons-type.controller';

@Module({
  controllers: [PersonsTypeController],
  providers: [PersonsTypeService],
})
export class PersonsTypeModule {}
