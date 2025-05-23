import { Injectable } from '@nestjs/common';
import { ReservationLaboratoryEquipment } from '../entities/reservation-laboratory-equipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { CreateReservationDetailDto } from '../dto/create-reservation-detail.dto';

@Injectable()
export class ReservationLaboratoryEquipmentService {
  constructor(
    @InjectRepository(ReservationLaboratoryEquipment)
    private readonly reservationLaboratoryEquipmentRepository: Repository<ReservationLaboratoryEquipment>,
  ) {}

  async create(
    createReservationDetailDto: CreateReservationDetailDto,
    queryRunner?: QueryRunner,
  ): Promise<ReservationLaboratoryEquipment> {
    const [year, month, day] = createReservationDetailDto.date
      .split('-')
      .map(Number);
    const repository = queryRunner
      ? queryRunner.manager.getRepository(ReservationLaboratoryEquipment)
      : this.reservationLaboratoryEquipmentRepository;
    const reservationDetail = repository.create({
      metadata: {},
      laboratoryEquipment: {
        laboratoryEquipeId: createReservationDetailDto.laboratoryEquipeId,
      },
      reservationDate: new Date(year, month - 1, day),
      initialHour: createReservationDetailDto.initialHour,
      finalHour: createReservationDetailDto.finalHour,
    });
    return await this.reservationLaboratoryEquipmentRepository.save(
      reservationDetail,
    );
  }
}
