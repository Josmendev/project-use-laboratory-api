import { Injectable } from '@nestjs/common';
import { CreateAttributesTypeDto } from './dto/create-attributes-type.dto';
import { UpdateAttributesTypeDto } from './dto/update-attributes-type.dto';

@Injectable()
export class AttributesTypeService {
  create(createAttributesTypeDto: CreateAttributesTypeDto) {
    return 'This action adds a new attributesType';
  }

  findAll() {
    return `This action returns all attributesType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attributesType`;
  }

  update(id: number, updateAttributesTypeDto: UpdateAttributesTypeDto) {
    return `This action updates a #${id} attributesType`;
  }

  remove(id: number) {
    return `This action removes a #${id} attributesType`;
  }
}
