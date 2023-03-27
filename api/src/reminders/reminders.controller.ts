import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';
import { RemindersService } from './reminders.service';

@ApiTags('reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @ApiResponse({ status: 200, description: 'All reminders are returned.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get()
  findAll(@Query() paginationQuery): Promise<{ [key: string]: Reminder }> {
    // const { limit, offset } = paginationQuery;

    // TODO: set default offset and limit
    // We can later add a pagination DTO with the limit and offset to pass as parameters to the ReminderService
    return this.remindersService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Reminder is returned.' })
  @ApiResponse({ status: 404, description: 'No reminders were found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reminder | {}> {
    return this.remindersService.findOne(id);
  }

  @Post()
  create(
    @Body() createReminderDto: CreateReminderDto,
  ): Promise<{} | CreateReminderDto> {
    // when creating the service for the create method we should do server side validation
    return this.remindersService.create(createReminderDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    return this.remindersService.update(id, updateReminderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.remindersService.delete(id);
  }

  @Delete()
  deleteAll() {
    return this.remindersService.deleteAll();
  }
}
