import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { RequestWithUser } from '../interfaces/request-with-user.interface';
import { ValidateUserResponseDto } from '../dto/validate-user-response.dto';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let requiredRoles: string[] = this.reflector.get(
      ROLES_KEY,
      context.getHandler(),
    );
    // methods level
    if (!requiredRoles || requiredRoles.length === 0)
      requiredRoles = this.reflector.get(ROLES_KEY, context.getClass());
    // class level
    if (!requiredRoles || requiredRoles.length === 0) return true;
    const req: RequestWithUser = context.switchToHttp().getRequest();
    const user: ValidateUserResponseDto = req.user as ValidateUserResponseDto;
    if (!user)
      throw new BadRequestException('No se encuentra registrado el usuario');
    const confirmationRole = requiredRoles.some((role) =>
      user.roles?.includes(role),
    );
    if (confirmationRole) return true;

    throw new BadRequestException(
      `El usuario con el codigo ${user.username} no posee el rol de: [${requiredRoles.join(', ')}]`,
    );
  }
}
