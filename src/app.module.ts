import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AdminSubscriptionsModule } from './admin-subscriptions/admin-subscriptions.module';
import { AdminPersonsModule } from './admin-persons/admin-persons.module';
import { AdminServicesModule } from './admin-services/admin-services.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { EmailsModule } from './emails/emails.module';
import { ExternalApisModule } from './external-apis/external-apis.module';
import { AdminProgrammingModule } from './admin-programming/admin-programming.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: typeOrmConfig }),
    CommonModule,
    AdminSubscriptionsModule,
    AdminPersonsModule,
    AdminServicesModule,
    ReservationsModule,
    AuthModule,
    EmailsModule,
    ExternalApisModule,
    AdminProgrammingModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
