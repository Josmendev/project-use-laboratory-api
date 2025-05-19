import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginClientDto } from './dto/login-client.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-client')
  login(@Body() loginClientDto: LoginClientDto) {
    return this.authService.loginClient(loginClientDto);
  }
}
