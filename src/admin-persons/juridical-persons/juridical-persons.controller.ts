import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JuridicalPersonsService } from './juridical-persons.service';
import { CreateJuridicalPersonDto } from './dto/create-juridical-person.dto';
import { UpdateJuridicalPersonDto } from './dto/update-juridical-person.dto';

@Controller('juridical-persons')
export class JuridicalPersonsController {
  constructor(
    private readonly juridicalPersonsService: JuridicalPersonsService,
  ) {}

  @Post()
  create(@Body() createJuridicalPersonDto: CreateJuridicalPersonDto) {
    return this.juridicalPersonsService.create(createJuridicalPersonDto);
  }

  @Get()
  findAll() {
    return this.juridicalPersonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.juridicalPersonsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJuridicalPersonDto: UpdateJuridicalPersonDto,
  ) {
    return this.juridicalPersonsService.update(+id, updateJuridicalPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.juridicalPersonsService.remove(+id);
  }
}
