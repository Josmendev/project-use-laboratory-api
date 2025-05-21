// En programming-hours.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgrammingHours } from '../entities/programming-hours.entity';
import { Repository } from 'typeorm';
import { ValidateHoursDisponibilityDto } from '../dto/validate-hours-disponiblity.dto';
import { StatusProgramming } from '../enums/status-programming.enum';
import { ReservationsService } from 'src/reservations/reservations.service';
import { formatValidateHoursResponse } from '../helpers/formate-validate-hours-response.helper';

@Injectable()
export class ProgrammingHoursService {
  constructor(
    @InjectRepository(ProgrammingHours)
    private readonly programmingHoursRepository: Repository<ProgrammingHours>,
    private readonly reservationsService: ReservationsService,
  ) {}

  async validateHoursDisponibility(
    validateHoursDisponibilityDto: ValidateHoursDisponibilityDto,
    userId: string,
  ) {
    const {
      dayOfWeek,
      date,
      initialHour,
      finalHour,
      subscriptionId,
      numberReservationDays,
    } = validateHoursDisponibilityDto;
    const queryDate = new Date(date);
    const initialHourString = `${initialHour}:00`;
    const finalHourString = `${finalHour}:00`;
    const queryDateFormatted = queryDate.toISOString().split('T')[0];
    // Validacion del numero de reservas
    await this.reservationsService.hasUserReachedReservationLimit(
      userId,
      queryDateFormatted,
      numberReservationDays,
    );
    try {
      const availableSlots = await this.programmingHoursRepository
        .createQueryBuilder('hours')
        .innerJoinAndSelect('hours.programmingDay', 'programmingDay')
        .innerJoinAndSelect('programmingDay.day', 'day')
        .innerJoinAndSelect(
          'programmingDay.programmingSubscriptionDetail',
          'psd',
        )
        .innerJoinAndSelect('psd.subscriptionDetail', 'sd')
        .innerJoinAndSelect('sd.service', 'service')
        .leftJoinAndSelect('sd.subscription', 'subscription')
        .innerJoinAndSelect('service.laboratory', 'laboratory')
        .innerJoinAndSelect('laboratory.laboratoryEquipment', 'labEquipment')
        .leftJoinAndSelect('labEquipment.equipment', 'equipment')
        .leftJoinAndSelect('equipment.equipmentResources', 'equipmentResources')
        .where('subscription.subscriptionId = :subscriptionId', {
          subscriptionId,
        })
        .andWhere('subscription.status = :status', {
          status: StatusProgramming.ACTIVE,
        })
        .andWhere('day.description = :dayOfWeek', { dayOfWeek })
        .andWhere(':queryDate BETWEEN psd.initialDate AND psd.finalDate', {
          queryDate,
        })
        .andWhere(
          `(
            (hours.initialHour <= hours.finalHour AND 
            :initialHour BETWEEN hours.initialHour AND hours.finalHour AND
            :finalHour BETWEEN hours.initialHour AND hours.finalHour)
            OR
            (hours.initialHour > hours.finalHour AND 
            (:initialHour >= hours.initialHour OR :finalHour <= hours.finalHour))
          )`,
          { initialHour: initialHourString, finalHour: finalHourString },
        )
        .getMany();
      // 2. Verificar disponibilidad para cada slot
      const resultWithAvailability = await this.getAvailableSlots(
        availableSlots,
        queryDateFormatted,
        initialHourString,
        finalHourString,
      );

      const finalAvailableSlots = resultWithAvailability.filter(
        (slot) => slot.laboratory && slot.laboratory.equipment.length > 0,
      );

      return finalAvailableSlots.flatMap((slot) =>
        formatValidateHoursResponse(slot),
      );
    } catch (error) {
      throw new Error('Error al validar disponibilidad de horarios: ', error);
    }
  }

  // Internal helpers methods
  private async getAvailableSlots(
    availableSlots: ProgrammingHours[],
    queryDateFormatted: string,
    initialHourString: string,
    finalHourString: string,
  ) {
    return await Promise.all(
      availableSlots.map(async (slot) => {
        const lab =
          slot.programmingDay.programmingSubscriptionDetail.subscriptionDetail
            .service.laboratory;

        const equipmentWithAvailability = await Promise.all(
          lab.laboratoryEquipment.map(async (le) => {
            if (!le.laboratoryEquipeId)
              return {
                ...le,
                availableQuantity: 0,
                isAvailableForReservation: false,
              };

            const overlappingReservationsCount =
              await this.reservationsService.checkAvailability(
                le.laboratoryEquipeId,
                queryDateFormatted,
                initialHourString,
                finalHourString,
              );

            const availableQuantity =
              le.quantity - overlappingReservationsCount;

            return {
              equipmentId: le.equipment.equipmentId,
              description: le.equipment.description,
              quantity: le.quantity,
              availableQuantity,
              isAvailable: availableQuantity > 0,
              resources: le.equipment.equipmentResources.map(
                (er) => er.description,
              ),
            };
          }),
        );

        return {
          laboratoryId: lab.laboratoryId,
          laboratoryEquipment: lab.laboratoryEquipment,
          description: lab.description,
          slotId: slot.programmingHoursId,
          initialHour: slot.initialHour,
          finalHour: slot.finalHour,
          laboratory: {
            laboratoryId: lab.laboratoryId,
            description: lab.description,
            equipment: equipmentWithAvailability.filter((e) => e.isAvailable),
          },
        };
      }),
    );
  }
}
