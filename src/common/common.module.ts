import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptAdapter } from './adapters/bcrypt.adapter';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [JwtModule],
  providers: [BcryptAdapter, TransactionService],
  exports: [BcryptAdapter, TransactionService],
})
export class CommonModule {}
