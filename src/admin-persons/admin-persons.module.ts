import { Module } from '@nestjs/common';
import { PersonsModule } from './persons/persons.module';
import { NaturalPersonsModule } from './natural-persons/natural-persons.module';
import { JuridicalPersonsModule } from './juridical-persons/juridical-persons.module';
import { PersonsTypeModule } from './persons-type/persons-type.module';
import { InformationTypeModule } from './information-type/information-type.module';

@Module({
  imports: [PersonsModule, NaturalPersonsModule, JuridicalPersonsModule, PersonsTypeModule, InformationTypeModule]
})
export class AdminPersonsModule {}
