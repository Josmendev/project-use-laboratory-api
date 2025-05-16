import { Injectable } from '@nestjs/common';
import { CreatePersonsTypeDto } from './dto/create-persons-type.dto';
import { UpdatePersonsTypeDto } from './dto/update-persons-type.dto';

@Injectable()
export class PersonsTypeService {
  create(createPersonsTypeDto: CreatePersonsTypeDto) {
    return 'This action adds a new personsType';
  }

  findAll() {
    return `This action returns all personsType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personsType`;
  }

  update(id: number, updatePersonsTypeDto: UpdatePersonsTypeDto) {
    return `This action updates a #${id} personsType`;
  }

  remove(id: number) {
    return `This action removes a #${id} personsType`;
  }
}
