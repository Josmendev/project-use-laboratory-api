import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionsTypeService } from './subscriptions-type.service';
import { CreateSubscriptionsTypeDto } from './dto/create-subscriptions-type.dto';
import { UpdateSubscriptionsTypeDto } from './dto/update-subscriptions-type.dto';

@Controller('subscriptions-type')
export class SubscriptionsTypeController {
  constructor(private readonly subscriptionsTypeService: SubscriptionsTypeService) {}

  @Post()
  create(@Body() createSubscriptionsTypeDto: CreateSubscriptionsTypeDto) {
    return this.subscriptionsTypeService.create(createSubscriptionsTypeDto);
  }

  @Get()
  findAll() {
    return this.subscriptionsTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionsTypeDto: UpdateSubscriptionsTypeDto) {
    return this.subscriptionsTypeService.update(+id, updateSubscriptionsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionsTypeService.remove(+id);
  }
}
