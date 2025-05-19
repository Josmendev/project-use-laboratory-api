import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { envs } from 'src/config/envs.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // PassportStrategy: check if the JWT is based on the secret key and has not expired
  // Strategy: indicate if the token is valid
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: envs.jwt.secret,
      // where I expect to send that token -> Bearer Token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayloadDto): Promise<any> {
    // validate: validate the payload with the issued data once the token has been approved
    // if (await this.authService.isBlacklisted(token))
    //   throw new UnauthorizedException('Token no válido o sesión expirada');
    const { id } = payload;
    return await this.authService.validateUser(id);
  }
}
