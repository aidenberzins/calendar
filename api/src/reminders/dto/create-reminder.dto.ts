import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateReminderDto {
  @ApiProperty({ description: 'The title of the event', required: true })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'The date of the event' })
  @IsString()
  readonly date: string;

  @IsBoolean()
  readonly allDay: boolean;

  @IsString()
  @IsOptional()
  readonly startTime: string;

  @IsString()
  @IsOptional()
  readonly endTime: string;

  @IsString()
  readonly color: string;
}
