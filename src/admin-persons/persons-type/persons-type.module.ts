import { Module } from '@nestjs/common';
import { PersonsTypeService } from './persons-type.service';
import { PersonsTypeController } from './persons-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsType } from './entities/persons-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonsType])],
  controllers: [PersonsTypeController],
  providers: [PersonsTypeService],
})
export class PersonsTypeModule {}
