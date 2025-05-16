import { Injectable } from '@nestjs/common';
import { CreateProgrammingDto } from './dto/create-programming.dto';
import { UpdateProgrammingDto } from './dto/update-programming.dto';

@Injectable()
export class ProgrammingService {
  create(createProgrammingDto: CreateProgrammingDto) {
    return 'This action adds a new programming';
  }

  findAll() {
    return `This action returns all programming`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programming`;
  }

  update(id: number, updateProgrammingDto: UpdateProgrammingDto) {
    return `This action updates a #${id} programming`;
  }

  remove(id: number) {
    return `This action removes a #${id} programming`;
  }
}
