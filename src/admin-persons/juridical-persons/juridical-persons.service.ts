import { Injectable } from '@nestjs/common';
import { CreateJuridicalPersonDto } from './dto/create-juridical-person.dto';
import { UpdateJuridicalPersonDto } from './dto/update-juridical-person.dto';

@Injectable()
export class JuridicalPersonsService {
  create(createJuridicalPersonDto: CreateJuridicalPersonDto) {
    return 'This action adds a new juridicalPerson';
  }

  findAll() {
    return `This action returns all juridicalPersons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} juridicalPerson`;
  }

  update(id: number, updateJuridicalPersonDto: UpdateJuridicalPersonDto) {
    return `This action updates a #${id} juridicalPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} juridicalPerson`;
  }
}
