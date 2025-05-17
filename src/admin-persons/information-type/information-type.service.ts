import { Injectable } from '@nestjs/common';
import { CreateInformationTypeDto } from './dto/create-information-type.dto';
import { UpdateInformationTypeDto } from './dto/update-information-type.dto';

@Injectable()
export class InformationTypeService {
  create(createInformationTypeDto: CreateInformationTypeDto) {
    return 'This action adds a new informationType';
  }

  findAll() {
    return `This action returns all informationType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} informationType`;
  }

  update(id: number, updateInformationTypeDto: UpdateInformationTypeDto) {
    return `This action updates a #${id} informationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} informationType`;
  }
}
