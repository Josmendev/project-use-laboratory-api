import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { StatusReservation } from './enums/status-reservation.enum';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

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
}
