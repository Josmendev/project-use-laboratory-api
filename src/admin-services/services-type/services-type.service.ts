import { Injectable } from '@nestjs/common';
import { CreateServicesTypeDto } from './dto/create-services-type.dto';
import { UpdateServicesTypeDto } from './dto/update-services-type.dto';

@Injectable()
export class ServicesTypeService {
  create(createServicesTypeDto: CreateServicesTypeDto) {
    return 'This action adds a new servicesType';
  }

  findAll() {
    return `This action returns all servicesType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicesType`;
  }

  update(id: number, updateServicesTypeDto: UpdateServicesTypeDto) {
    return `This action updates a #${id} servicesType`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicesType`;
  }
}
