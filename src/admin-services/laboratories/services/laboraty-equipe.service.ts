import { Injectable, NotFoundException } from '@nestjs/common';
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
import { ResourcesLaboratoryResponse } from '../interfaces/resources-laboratories-response.interface';
import { formatResourcesLaboratoryEquipmentResponse } from '../helpers/format-resources-laboratories-equipemnt-response.helper';
import { isValidDayOfWeek } from 'src/common/helpers/is-valid-day-of-week.helper';
import { isValidDate } from '../helpers/is-valid-date.helper';
import { isValidReservationTime } from '../helpers/is-valid-reservation-time.helper';
import { SummaryLaboratoryEquipmentResponse } from '../interfaces/summary-laboratories-equipment.interface';
import { formatSummaryLaboratoryEquipmentResponse } from '../helpers/format-summary-laboratories-equipment.helper';

@Injectable()
export class LaboratoryEquipeService extends BaseService<LaboratoryEquipment> {
  constructor(
    @InjectRepository(LaboratoryEquipment)
    private readonly laboratoryEquipmentRepository: Repository<LaboratoryEquipment>,
    private readonly subscriberService: SubscribersService,
    private readonly programmingHoursService: ProgrammingHoursService,
  ) {
    super(laboratoryEquipmentRepository);
  }

  // Methods for endpoints
  // CLI
  async findAllLaboratoriesByDisponibility(
    findAllDisponibilityListDto: FindAllDisponibilityListDto,
    userId: string,
  ): Promise<Paginated<LaboratoryDisponibilityResponseDto>> {
    const {
      dayOfWeek,
      date,
      initialHour,
      reservationTime,
      maximumReservationTime,
      numberReservationDays,
      searchTerm,
      ...paginationDto
    } = findAllDisponibilityListDto;
    isValidDayOfWeek(dayOfWeek, date);
    isValidDate(date, initialHour);
    isValidReservationTime(reservationTime, maximumReservationTime);
    const finalHour = calculateFinalHour(initialHour, reservationTime);
    const subscriber =
      await this.subscriberService.findOneBySubscriberId(userId);
    const { subscription } = subscriber;
    const { subscriptionId } = subscription;
    const laboratoriesDisponibility =
      await this.programmingHoursService.validateHoursDisponibility(
        {
          dayOfWeek,
          date,
          initialHour,
          reservationTime,
          finalHour,
          subscriptionId,
          maximumReservationTime,
          numberReservationDays,
        },
        userId,
      );
    if (searchTerm)
      return await this.searchBase(
        laboratoriesDisponibility,
        searchTerm,
        paginationDto,
        ['resources'] as (keyof LaboratoryDisponibilityResponseDto)[],
      );
    return await this.findAllBase(laboratoriesDisponibility, paginationDto);
  }

  async findOneById(id: string): Promise<ResourcesLaboratoryResponse> {
    const laboratoryEquipment =
      await this.laboratoryEquipmentRepository.findOne({
        where: { laboratoryEquipeId: id },
        relations: [
          'laboratory',
          'equipment',
          'equipment.equipmentResources',
          'equipment.equipmentResources.attribute',
        ],
      });
    if (!laboratoryEquipment)
      throw new NotFoundException(
        `No se ha encontrado el laboratorio con id ${id}`,
      );
    return formatResourcesLaboratoryEquipmentResponse(laboratoryEquipment);
  }

  async findOneSummaryById(
    id: string,
  ): Promise<SummaryLaboratoryEquipmentResponse> {
    const laboratoryEquipment =
      await this.laboratoryEquipmentRepository.findOne({
        where: { laboratoryEquipeId: id },
        relations: [
          'laboratory',
          'equipment',
          'equipment.equipmentResources',
          'equipment.equipmentResources.attribute',
        ],
      });
    if (!laboratoryEquipment)
      throw new NotFoundException(
        `No se ha encontrado el laboratorio con id ${id}`,
      );
    return formatSummaryLaboratoryEquipmentResponse(laboratoryEquipment);
  }
}
