import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginClientDto } from './dto/login-client.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { Subscriber } from 'src/admin-subscriptions/subscribers/entities/subscriber.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-client')
  login(@Body() loginClientDto: LoginClientDto) {
    return this.authService.loginClient(loginClientDto);
  }

  @Get('user-profile')
  @Auth()
  userProfile(@GetUser() user: Subscriber) {
    return user;
  }
}
