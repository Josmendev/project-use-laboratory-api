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
import { SeedsModule } from './seeds/seeds.module';
import { FilesModule } from './files/files.module';
import { envs } from './config/envs.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.db.host,
      port: envs.db.port,
      username: envs.db.username,
      password: envs.db.password,
      database: envs.db.database,
      autoLoadEntities: true,
      synchronize: envs.db.synchronize,
    }),
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
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
