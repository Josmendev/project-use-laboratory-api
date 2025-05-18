import { Module } from '@nestjs/common';
import { ServicesTypeService } from './services-type.service';
import { ServicesTypeController } from './services-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesType } from './entities/services-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesType])],
  controllers: [ServicesTypeController],
  providers: [ServicesTypeService],
})
export class ServicesTypeModule {}
