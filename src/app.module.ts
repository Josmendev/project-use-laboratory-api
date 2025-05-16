import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AdminSubscriptionModule } from './admin-subscription/admin-subscription.module';
import { AdminPersonModule } from './admin-person/admin-person.module';
import { AdminSubscriptionsModule } from './admin-subscriptions/admin-subscriptions.module';
import { AdminPersonsModule } from './admin-persons/admin-persons.module';
import { AdminServicesModule } from './admin-services/admin-services.module';
import { RegisterReservationsModule } from './register-reservations/register-reservations.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { EmailsModule } from './emails/emails.module';
import { ExternalApisModule } from './external-apis/external-apis.module';
import { PersonsModule } from './persons/persons.module';
import { AdminProgrammingModule } from './admin-programming/admin-programming.module';

@Module({
  imports: [CommonModule, AdminSubscriptionModule, AdminPersonModule, AdminSubscriptionsModule, AdminPersonsModule, AdminServicesModule, RegisterReservationsModule, ReservationsModule, AuthModule, EmailsModule, ExternalApisModule, PersonsModule, AdminProgrammingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
