import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './services/persons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { PersonInformation } from './entities/person-information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, PersonInformation])],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
