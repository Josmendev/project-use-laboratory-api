import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptAdapter } from './adapters/bcrypt.adapter';

@Module({
  imports: [JwtModule],
  providers: [BcryptAdapter],
  exports: [BcryptAdapter],
})
export class CommonModule {}
