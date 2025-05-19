import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginClientDto } from './dto/login-client.dto';
import { LoginClientResponseDto } from './dto/login-client-response.dto';
import { SubscribersService } from 'src/admin-subscriptions/subscribers/services/subscribers.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { TokenService } from 'src/common/interfaces/token-service.interface';
import { TOKEN_SERVICE } from 'src/common/constants/constants';
import { formatUserResponseForLogin } from './helpers/format-user-response-for-login';
import { StatusSubscription } from 'src/admin-subscriptions/subscriptions/enums/status-subscription.enum';
import { ValidateUserResponseDto } from './dto/validate-user-response.dto';
import { formatValidateUserResponse } from './helpers/format-validate-user-response.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly subscribersService: SubscribersService,
    @Inject(TOKEN_SERVICE) private readonly jwt: TokenService,
  ) {}
  // Methods for endpoints
  // CLI
  async loginClient(
    loginClientDto: LoginClientDto,
  ): Promise<LoginClientResponseDto> {
    const { username, url } = loginClientDto;
    const user = await this.subscribersService.findOneByUsername(username, url);
    console.log(user);
    if (user) console.log(user.subscription.status);
    if (!user || user.subscription.status !== StatusSubscription.ACTIVE)
      throw new NotFoundException(
        `No se encuentra el usuario con el nombre de usuario: ${username}`,
      );
    const token = this.getJwtToken({ id: user.subscriberId });
    console.log(token);
    return {
      ...formatUserResponseForLogin(user),
      token,
    };
  }

  // Internal helpers methods
  async validateUser(id: string): Promise<ValidateUserResponseDto | null> {
    const user = await this.subscribersService.findOneBySubscriberId(id);
    if (!user) throw new UnauthorizedException(`Token no válido`);
    if (user.subscription.status !== StatusSubscription.ACTIVE)
      throw new UnauthorizedException(
        `El usuario se encuentra sin subscripción activa`,
      );
    return formatValidateUserResponse(user);
  }

  private getJwtToken(payload: JwtPayloadDto): string {
    return this.jwt.sign(payload);
  }
}
