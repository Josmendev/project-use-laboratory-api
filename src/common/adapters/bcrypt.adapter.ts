import * as bcrypt from 'bcryptjs';
import { EncryptionService } from '../interfaces/encryption-service.interface';
import { Injectable } from '@nestjs/common';
import { envs } from 'src/config/envs.config';

@Injectable()
export class BcryptAdapter implements EncryptionService {
  constructor() {}

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, envs.hash.saltRounds);
  }

  hashSync(data: string): string {
    return bcrypt.hashSync(data, envs.hash.saltRounds);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
