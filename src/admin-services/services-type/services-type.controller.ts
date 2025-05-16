import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesTypeService } from './services-type.service';
import { CreateServicesTypeDto } from './dto/create-services-type.dto';
import { UpdateServicesTypeDto } from './dto/update-services-type.dto';

@Controller('services-type')
export class ServicesTypeController {
  constructor(private readonly servicesTypeService: ServicesTypeService) {}

  @Post()
  create(@Body() createServicesTypeDto: CreateServicesTypeDto) {
    return this.servicesTypeService.create(createServicesTypeDto);
  }

  @Get()
  findAll() {
    return this.servicesTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicesTypeDto: UpdateServicesTypeDto) {
    return this.servicesTypeService.update(+id, updateServicesTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesTypeService.remove(+id);
  }
}
