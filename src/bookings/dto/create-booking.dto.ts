import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Room ID of the booked room',
  })
  roomId: number;

  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'Start time of the booking',
  })
  startTime: Date;

  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'End time of the booking',
  })
  endTime: Date;
}
