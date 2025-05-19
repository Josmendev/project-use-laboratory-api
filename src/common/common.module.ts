import { Module } from '@nestjs/common';
import { JwtAdapter } from './adapters/jwt.adapter';
import { TOKEN_SERVICE } from './constants/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [{ provide: TOKEN_SERVICE, useClass: JwtAdapter }],
  exports: [TOKEN_SERVICE],
})
export class CommonModule {}
