import { BadRequestException, Injectable } from '@nestjs/common';
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
    const {
      dayOfWeek,
      date,
      initialHour,
      reservationTime,
      maximumReservationTime,
      numberReservationDays,
    } = findAllDisponibilityListDto;
    this.isValidDate(date, initialHour);
    this.isValidReservationTime(reservationTime, maximumReservationTime);
    const finalHour = calculateFinalHour(initialHour, reservationTime);
    const subscriber =
      await this.subscriberService.findOneBySubscriberId(userId);
    const { subscription } = subscriber;
    const { subscriptionId } = subscription;
    const laboratoriesDisponibility =
      await this.ProgrammingHoursService.validateHoursDisponibility(
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
    return await this.findAllBase(laboratoriesDisponibility, paginationDto);
  }

  // Internal helpers methods
  private isValidDate(date: string, initialHour: string): void {
    const inputDateTime = new Date(`${date}T${initialHour}`);
    const now = new Date();

    if (inputDateTime < now) {
      throw new BadRequestException(
        'La fecha y/o la hora no pueden ser anteriores a la actual',
      );
    }
  }

  private isValidReservationTime(
    reservationTime: number,
    paramMaximumReservatuionTime: number,
  ): void {
    if (reservationTime > paramMaximumReservatuionTime)
      throw new BadRequestException(
        `El tiempo de reserva no puede ser mayor a ${paramMaximumReservatuionTime}`,
      );
  }
}
