import { Body, Controller, Post, Query } from '@nestjs/common';
import { LaboratoriesService } from './services/laboratories.service';
import { FindAllDisponibilityListDto } from './dto/find-all-disponibility-list.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ValidateUserResponseDto } from 'src/auth/dto/validate-user-response.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { LaboratoryEquipeService } from './services/laboraty-equipe.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('laboratories')
@Auth(Role.CLIENT)
export class LaboratoriesController {
  constructor(
    private readonly laboratoriesService: LaboratoriesService,
    private readonly laboratoryEquipeService: LaboratoryEquipeService,
  ) {}
  @Post('list-disponibility')
  findAllLaboratoriesByDisponibility(
    @GetUser() user: ValidateUserResponseDto,
    @Body() findAllDisponibilityListDto: FindAllDisponibilityListDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.laboratoryEquipeService.findAllLaboratoriesByDisponibility(
      findAllDisponibilityListDto,
      paginationDto,
      user.subscriberId,
    );
  }
}
