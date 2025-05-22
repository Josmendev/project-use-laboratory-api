import { Body, Controller, Post } from '@nestjs/common';
import { ReservationsService } from './services/reservations.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ValidateUserResponseDto } from 'src/auth/dto/validate-user-response.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('reservations')
@Auth(Role.CLIENT)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @Post()
  createReservation(
    @GetUser() user: ValidateUserResponseDto,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.createReservation(
      user.subscriberId,
      createReservationDto,
    );
  }
}
