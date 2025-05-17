import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformationTypeService } from './information-type.service';
import { CreateInformationTypeDto } from './dto/create-information-type.dto';
import { UpdateInformationTypeDto } from './dto/update-information-type.dto';

@Controller('information-type')
export class InformationTypeController {
  constructor(private readonly informationTypeService: InformationTypeService) {}

  @Post()
  create(@Body() createInformationTypeDto: CreateInformationTypeDto) {
    return this.informationTypeService.create(createInformationTypeDto);
  }

  @Get()
  findAll() {
    return this.informationTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informationTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformationTypeDto: UpdateInformationTypeDto) {
    return this.informationTypeService.update(+id, updateInformationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informationTypeService.remove(+id);
  }
}
