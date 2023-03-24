import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reminder, ReminderSchema } from './entities/reminder.entity';
import { RemindersController } from './reminders.controller';
import { RemindersService } from './reminders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reminder.name,
        schema: ReminderSchema,
      },
    ]),
  ],
  controllers: [RemindersController],
  providers: [RemindersService],
})
export class RemindersModule {}
