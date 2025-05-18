import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnicalSupportService } from './technical-support.service';
import { CreateTechnicalSupportDto } from './dto/create-technical-support.dto';
import { UpdateTechnicalSupportDto } from './dto/update-technical-support.dto';

@Controller('technical-support')
export class TechnicalSupportController {
  constructor(private readonly technicalSupportService: TechnicalSupportService) {}

  @Post()
  create(@Body() createTechnicalSupportDto: CreateTechnicalSupportDto) {
    return this.technicalSupportService.create(createTechnicalSupportDto);
  }

  @Get()
  findAll() {
    return this.technicalSupportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalSupportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechnicalSupportDto: UpdateTechnicalSupportDto) {
    return this.technicalSupportService.update(+id, updateTechnicalSupportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalSupportService.remove(+id);
  }
}
