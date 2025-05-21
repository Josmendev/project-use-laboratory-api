import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LaboratoryEquipment } from '../entities/laboratory-equipment.entity';
import { Repository } from 'typeorm';
import { SubscribersService } from 'src/admin-subscriptions/subscribers/services/subscribers.service';
import { FindAllDisponibilityListDto } from '../dto/find-all-disponibility-list.dto';
import { calculateFinalHour } from 'src/common/helpers/calculate-final-hour.helper';
import { ProgrammingHoursService } from '../../../admin-programming/programming/services/programming-hours.service';
import { LaboratoryDisponibilityResponseDto } from '../dto/laboratories-disponibility-response.dto';
import { Paginated } from '../../../common/interfaces/paginated.interface';
import { BaseService } from 'src/common/services/base.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class LaboratoryEquipeService extends BaseService<LaboratoryEquipment> {
  constructor(
    @InjectRepository(LaboratoryEquipment)
    private readonly laboratoryEquipmentRepository: Repository<LaboratoryEquipment>,
    private readonly subscriberService: SubscribersService,
    private readonly ProgrammingHoursService: ProgrammingHoursService,
  ) {
    super(laboratoryEquipmentRepository);
  }

  // Methods for endpoints
  // CLI
  async findAllLaboratoriesByDisponibility(
    findAllDisponibilityListDto: FindAllDisponibilityListDto,
    paginationDto: PaginationDto,
    userId: string,
  ): Promise<Paginated<LaboratoryDisponibilityResponseDto>> {
    const { dayOfWeek, date, initialHour, revervationTime } =
      findAllDisponibilityListDto;
    const finalHour = calculateFinalHour(initialHour, revervationTime);
    const subscriber =
      await this.subscriberService.findOneBySubscriberId(userId);
    const { subscription } = subscriber;
    const { subscriptionId } = subscription;
    const laboratoriesDisponibility =
      await this.ProgrammingHoursService.validateHoursDisponibility({
        dayOfWeek,
        date,
        initialHour,
        revervationTime,
        finalHour,
        subscriptionId,
      });
    return await this.findAllBase(laboratoriesDisponibility, paginationDto);
  }
}
