import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsType } from '../admin-persons/persons-type/entities/persons-type.entity';
import { Person } from '../admin-persons/persons/entities/person.entity';
import { NaturalPerson } from '../admin-persons/natural-persons/entities/natural-person.entity';
import { JuridicalPerson } from '../admin-persons/juridical-persons/entities/juridical-person.entity';
import { SubscriptionsType } from '../admin-subscriptions/subscriptions-type/entities/subscriptions-type.entity';
import { DocumentIdentityType } from '../admin-persons/document-identity-type/entities/document-identity-type.entity';
import { ServicesType } from '../admin-services/services-type/entities/services-type.entity';
import { Service } from '../admin-services/services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonsType,
      Person,
      NaturalPerson,
      JuridicalPerson,
      SubscriptionsType,
      DocumentIdentityType,
      ServicesType,
      Service,
    ]),
  ],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
