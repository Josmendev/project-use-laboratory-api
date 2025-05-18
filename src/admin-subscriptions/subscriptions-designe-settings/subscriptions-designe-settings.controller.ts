import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionsDesigneSettingsService } from './subscriptions-designe-settings.service';
import { CreateSubscriptionsDesigneSettingDto } from './dto/create-subscriptions-designe-setting.dto';
import { UpdateSubscriptionsDesigneSettingDto } from './dto/update-subscriptions-designe-setting.dto';

@Controller('subscriptions-designe-settings')
export class SubscriptionsDesigneSettingsController {
  constructor(private readonly subscriptionsDesigneSettingsService: SubscriptionsDesigneSettingsService) {}

  @Post()
  create(@Body() createSubscriptionsDesigneSettingDto: CreateSubscriptionsDesigneSettingDto) {
    return this.subscriptionsDesigneSettingsService.create(createSubscriptionsDesigneSettingDto);
  }

  @Get()
  findAll() {
    return this.subscriptionsDesigneSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionsDesigneSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionsDesigneSettingDto: UpdateSubscriptionsDesigneSettingDto) {
    return this.subscriptionsDesigneSettingsService.update(+id, updateSubscriptionsDesigneSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionsDesigneSettingsService.remove(+id);
  }
}
