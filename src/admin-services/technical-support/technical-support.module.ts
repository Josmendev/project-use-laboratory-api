import { Module } from '@nestjs/common';
import { TechnicalSupportService } from './technical-support.service';
import { TechnicalSupportController } from './technical-support.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalSupport } from './entities/technical-support.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalSupport])],
  controllers: [TechnicalSupportController],
  providers: [TechnicalSupportService],
})
export class TechnicalSupportModule {}
