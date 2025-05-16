import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonsTypeService } from './persons-type.service';
import { CreatePersonsTypeDto } from './dto/create-persons-type.dto';
import { UpdatePersonsTypeDto } from './dto/update-persons-type.dto';

@Controller('persons-type')
export class PersonsTypeController {
  constructor(private readonly personsTypeService: PersonsTypeService) {}

  @Post()
  create(@Body() createPersonsTypeDto: CreatePersonsTypeDto) {
    return this.personsTypeService.create(createPersonsTypeDto);
  }

  @Get()
  findAll() {
    return this.personsTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonsTypeDto: UpdatePersonsTypeDto) {
    return this.personsTypeService.update(+id, updatePersonsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsTypeService.remove(+id);
  }
}
