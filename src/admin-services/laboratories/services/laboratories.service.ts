import { Injectable } from '@nestjs/common';
import { UpdateLaboratoryDto } from '../dto/update-laboratory.dto';

@Injectable()
export class LaboratoriesService {
  // Methods for endpoints
  // CLI
  create() {
    return 'This action adds a new laboratory';
  }

  findAll() {
    return `This action returns all laboratories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} laboratory`;
  }

  update(id: number, updateLaboratoryDto: UpdateLaboratoryDto) {
    return `This action updates a #${id} laboratory`;
  }

  remove(id: number) {
    return `This action removes a #${id} laboratory`;
  }
}
