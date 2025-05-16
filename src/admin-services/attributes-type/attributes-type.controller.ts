import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributesTypeService } from './attributes-type.service';
import { CreateAttributesTypeDto } from './dto/create-attributes-type.dto';
import { UpdateAttributesTypeDto } from './dto/update-attributes-type.dto';

@Controller('attributes-type')
export class AttributesTypeController {
  constructor(private readonly attributesTypeService: AttributesTypeService) {}

  @Post()
  create(@Body() createAttributesTypeDto: CreateAttributesTypeDto) {
    return this.attributesTypeService.create(createAttributesTypeDto);
  }

  @Get()
  findAll() {
    return this.attributesTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributesTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttributesTypeDto: UpdateAttributesTypeDto) {
    return this.attributesTypeService.update(+id, updateAttributesTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributesTypeService.remove(+id);
  }
}
