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
import { AttributesType } from '../admin-services/attributes-type/entities/attributes-type.entity';
import { Attribute } from '../admin-services/attributes/entities/attribute.entity';
import { Equipment } from '../admin-services/equipment/entities/equipment.entity';
import { EquipmentResources } from '../admin-services/equipment/entities/equipment-resources.entity';
import { Laboratory } from '../admin-services/laboratories/entities/laboratory.entity';
import { LaboratoryEquipment } from '../admin-services/laboratories/entities/laboratory-equipment.entity';
import { Subscription } from '../admin-subscriptions/subscriptions/entities/subscription.entity';
import { SubscriptionDetail } from '../admin-subscriptions/subscriptions/entities/subscriptionDetail.entity';
import { Parameter } from '../admin-subscriptions/parameters/entities/parameter.entity';
import { Day } from '../admin-programming/day/entities/day.entity';
import { ProgrammingSubscriptionDetail } from '../admin-programming/programming/entities/programming-subscription-detail.entity';
import { ProgrammingDay } from '../admin-programming/programming/entities/programming-day.entity';
import { ProgrammingHours } from '../admin-programming/programming/entities/programming-hours.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonsType,
      Person,
      NaturalPerson,
      JuridicalPerson,
      DocumentIdentityType,
      ServicesType,
      Service,
      AttributesType,
      Attribute,
      Equipment,
      EquipmentResources,
      Laboratory,
      LaboratoryEquipment,
      SubscriptionsType,
      Subscription,
      SubscriptionDetail,
      Parameter,
      Day,
      ProgrammingSubscriptionDetail,
      ProgrammingDay,
      ProgrammingHours,
    ]),
  ],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
