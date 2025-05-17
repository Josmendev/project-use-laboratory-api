import { Module } from '@nestjs/common';
import { JuridicalPersonsService } from './juridical-persons.service';
import { JuridicalPersonsController } from './juridical-persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuridicalPerson } from './entities/juridical-person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JuridicalPerson])],
  controllers: [JuridicalPersonsController],
  providers: [JuridicalPersonsService],
})
export class JuridicalPersonsModule {}
