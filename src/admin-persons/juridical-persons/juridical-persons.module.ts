import { Module } from '@nestjs/common';
import { JuridicalPersonsService } from './juridical-persons.service';
import { JuridicalPersonsController } from './juridical-persons.controller';

@Module({
  controllers: [JuridicalPersonsController],
  providers: [JuridicalPersonsService],
})
export class JuridicalPersonsModule {}
