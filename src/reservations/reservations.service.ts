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
    laboratoryId: string,
    date: Date,
    startTime: string,
    endTime: string,
    equipmentQuantity: number,
  ): Promise<boolean> {
    const startDateTime = new Date(
      `${date.toISOString().split('T')[0]}T${startTime}`,
    );
    const endDateTime = new Date(
      `${date.toISOString().split('T')[0]}T${endTime}`,
    );

    const activeReservations = await this.reservationRepository
      .createQueryBuilder('reservation')
      .innerJoin(
        'reservation.reservationLaboratoryEquipment',
        'reservationLaboratoryEquipment',
      )
      .innerJoin(
        'reservationLaboratoryEquipment.laboratoryEquipment',
        'equipment',
      )
      .innerJoin('equipment.laboratory', 'laboratory')
      .where('laboratory.laboratoryId = :laboratoryId', { laboratoryId })
      .andWhere('reservation.status != :status', {
        status: StatusReservation.PENDING,
      })
      .andWhere(
        `
        (
          (reservation.initialHourDate < :endDateTime AND reservation.finalHourDate > :startDateTime)
        )
      `,
        { startDateTime, endDateTime },
      )
      .getCount();

    return activeReservations < equipmentQuantity;
  }
}
