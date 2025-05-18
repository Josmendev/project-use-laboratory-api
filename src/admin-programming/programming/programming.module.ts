import { Module } from '@nestjs/common';
import { ProgrammingController } from './programming.controller';
import { ProgrammingService } from './services/programming.service';

@Module({
  controllers: [ProgrammingController],
  providers: [ProgrammingService],
})
export class ProgrammingModule {}
