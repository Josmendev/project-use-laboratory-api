import { Module } from '@nestjs/common';
import { InformationTypeService } from './information-type.service';
import { InformationTypeController } from './information-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationType } from './entities/information-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InformationType])],
  controllers: [InformationTypeController],
  providers: [InformationTypeService],
})
export class InformationTypeModule {}
