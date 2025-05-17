import { Module } from '@nestjs/common';
import { NaturalPersonsService } from './natural-persons.service';
import { NaturalPersonsController } from './natural-persons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaturalPerson } from './entities/natural-person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NaturalPerson])],
  controllers: [NaturalPersonsController],
  providers: [NaturalPersonsService],
})
export class NaturalPersonsModule {}
