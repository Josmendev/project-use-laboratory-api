import { Module } from '@nestjs/common';
import { ProgrammingModule } from './programming/programming.module';
import { DayModule } from './day/day.module';

@Module({
  imports: [ProgrammingModule, DayModule],
})
export class AdminProgrammingModule {}
