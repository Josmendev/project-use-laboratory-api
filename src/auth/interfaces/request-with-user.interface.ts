import { Request } from 'express';
import { ValidateUserResponseDto } from '../dto/validate-user-response.dto';

export interface RequestWithUser extends Request {
  user?: ValidateUserResponseDto;
}
