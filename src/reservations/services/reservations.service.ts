import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { validateReservationHourRange } from '../helpers/validate-reservation-hour-range.helper';
import { validateReservationDate } from '../helpers/validate-reservation-date.helper';
import { StatusReservation } from '../enums/status-reservation.enum';
import { SubscribersService } from 'src/admin-subscriptions/subscribers/services/subscribers.service';
import { ReservationLaboratoryEquipmentService } from './reservation-laboratory-equipment.service';
import { LaboratoryEquipeService } from 'src/admin-services/laboratories/services/laboraty-equipe.service';
import { ProgrammingHoursService } from 'src/admin-programming/programming/services/programming-hours.service';
import { getMinutesFromHours } from '../helpers/get-minutes-from-hours.helper';
import { CreateReservationDetailDto } from '../dto/create-reservation-detail.dto';
import { Subscriber } from 'src/admin-subscriptions/subscribers/entities/subscriber.entity';
import { formatReservationResponse } from '../helpers/format-reservation-response.helper';
import { ReservationResponse } from '../interfaces/reservation-response.interface';
import { isValidDayOfWeek } from 'src/common/helpers/is-valid-day-of-week.helper';
import { paginate } from 'src/common/helpers/paginate.helper';
import { Paginated } from 'src/common/interfaces/paginated.interface';
import { FindAllByStatusDto } from '../dto/find-all-by-status.dto';
import { ReservationFindAllByStatusResponse } from '../interfaces/reservation-find-all-by-status.interface';
import { findAllByStatusResponse } from '../helpers/find-all-by-status-response.helper';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @Inject(forwardRef(() => LaboratoryEquipeService))
    private readonly laboratoryEquipeService: LaboratoryEquipeService,
    @Inject(forwardRef(() => ProgrammingHoursService))
    private readonly programmingHoursService: ProgrammingHoursService,
    private readonly subscriberService: SubscribersService,
    private readonly reservationLaboratoryEquipmentService: ReservationLaboratoryEquipmentService,
  ) {}

  // Methods for endpoints
  // CLI
  async createReservation(
    userId: string,
    createReservationDetailDto: CreateReservationDto,
  ): Promise<ReservationResponse> {
    const user = await this.subscriberService.findOneBySubscriberId(userId);
    const { metadata, reservationDetails } = createReservationDetailDto;
    await Promise.all(
      reservationDetails.map(async (detail, index) =>
        this.validateReservationDetail(detail, index, user, userId),
      ),
    );
    const reservation = this.reservationRepository.create({
      subscriber: user,
      metadata: metadata ?? {
        'Fecha de creación': new Date().toISOString(),
        'Codigo de usuario': user.username,
      },
      reservationLaboratoryEquipment: await Promise.all(
        reservationDetails.map((detail) =>
          this.reservationLaboratoryEquipmentService.create(detail),
        ),
      ),
    });
    const reservationSaved = await this.reservationRepository.save(reservation);
    return formatReservationResponse(reservationSaved);
  }

  async findAllByStatus(
    userId: string,
    findAllByStatusDto: FindAllByStatusDto,
  ): Promise<Paginated<ReservationFindAllByStatusResponse>> {
    const { status, ...paginationDto } = findAllByStatusDto;
    const reservations = await this.reservationRepository.find({
      relations: [
        'subscriber',
        'reservationLaboratoryEquipment',
        'reservationLaboratoryEquipment.laboratoryEquipment',
        'reservationLaboratoryEquipment.laboratoryEquipment.laboratory',
        'reservationLaboratoryEquipment.laboratoryEquipment.equipment',
      ],
      where: {
        subscriber: { subscriberId: userId },
        reservationLaboratoryEquipment: status ? { status } : {},
      },
    });
    return await paginate(
      reservations.map(findAllByStatusResponse),
      paginationDto,
    );
  }

  // Internal helpers methods
  async checkAvailability(
    labEquipmentId: string,
    date: string,
    initialHour: string,
    finalHour: string,
  ): Promise<number> {
    return this.reservationRepository
      .createQueryBuilder('rr')
      .innerJoinAndSelect('rr.reservationLaboratoryEquipment', 'rle')
      .innerJoinAndSelect('rle.laboratoryEquipment', 'leJoined')
      .where('leJoined.laboratoryEquipeId = :labEquipmentId', {
        labEquipmentId,
      })
      .andWhere('rle.status = :status', {
        status: StatusReservation.PENDING,
      })
      .andWhere('rle.reservationDate = :date', {
        date,
      })
      .andWhere(
        `(
          (rle.initialHour <= rle.finalHour AND
          :initialHour < rle.finalHour AND
          :finalHour > rle.initialHour)
          OR
          (rle.initialHour > rle.finalHour AND
          (:initialHour < rle.finalHour OR :finalHour > rle.initialHour))
        )`,
        {
          initialHour,
          finalHour,
        },
      )
      .getCount();
  }

  async hasUserReachedReservationLimit(
    userId: string,
    date: string,
    numberReservationDays: number,
  ): Promise<void> {
    const reservationsCount = await this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoin('reservation.subscriber', 'subscriber')
      .leftJoin(
        'reservation.reservationLaboratoryEquipment',
        'reservationLaboratoryEquipment',
      )
      .where('subscriber.subscriberId = :userId', { userId })
      .andWhere('reservationLaboratoryEquipment.reservationDate = :date', {
        date,
      })
      .andWhere('reservationLaboratoryEquipment.status IN (:...statuses)', {
        statuses: [StatusReservation.PENDING],
      })
      .getCount();
    if (reservationsCount >= numberReservationDays)
      throw new BadRequestException(
        `El usuario ha alcanzado el límite de reservas para la fecha: ${date}`,
      );
  }

  private async validateReservationDetail(
    detail: CreateReservationDetailDto,
    index: number,
    user: Subscriber,
    userId: string,
  ) {
    isValidDayOfWeek(detail.dayName, detail.date);
    await this.laboratoryEquipeService.findOneById(detail.laboratoryEquipeId);
    validateReservationHourRange(detail.initialHour, detail.finalHour, index);
    validateReservationDate(detail.date, index);
    const initialHourMinutes = getMinutesFromHours(detail.initialHour);
    const finalHourMinutes = getMinutesFromHours(detail.finalHour);

    const disponibilidad =
      await this.programmingHoursService.validateHoursDisponibility(
        {
          dayOfWeek: detail.dayName,
          date: detail.date.split('T')[0],
          initialHour: detail.initialHour,
          reservationTime: finalHourMinutes - initialHourMinutes,
          finalHour: detail.finalHour,
          subscriptionId: user.subscription.subscriptionId,
          maximumReservationTime:
            user.subscription.parameters.miniumNumberMinutes,
          numberReservationDays:
            user.subscription.parameters.numberReservationDay,
        },
        userId,
      );

    if (disponibilidad.length === 0) {
      throw new BadRequestException(
        `El laboratorio no se encuentra disponible para la fecha seleccionada ${detail.date} y hora seleccionada ${detail.initialHour} - ${detail.finalHour}`,
      );
    }
  }
}
