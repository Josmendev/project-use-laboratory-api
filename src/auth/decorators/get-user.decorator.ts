import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { RequestWithUser } from '../interfaces/request-with-user.interface';
import { ValidateUserResponseDto } from '../dto/validate-user-response.dto';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ValidateUserResponseDto => {
    const req: RequestWithUser = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user)
      throw new InternalServerErrorException(
        'El usuario no se encuentra (request)',
      );
    return user;
  },
);
