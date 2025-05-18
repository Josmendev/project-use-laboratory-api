import { Injectable } from '@nestjs/common';
import { CreateTechnicalSupportDto } from './dto/create-technical-support.dto';
import { UpdateTechnicalSupportDto } from './dto/update-technical-support.dto';

@Injectable()
export class TechnicalSupportService {
  create(createTechnicalSupportDto: CreateTechnicalSupportDto) {
    return 'This action adds a new technicalSupport';
  }

  findAll() {
    return `This action returns all technicalSupport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technicalSupport`;
  }

  update(id: number, updateTechnicalSupportDto: UpdateTechnicalSupportDto) {
    return `This action updates a #${id} technicalSupport`;
  }

  remove(id: number) {
    return `This action removes a #${id} technicalSupport`;
  }
}
