import { Booking } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { convertDateToUTC } from 'src/helpers/date';

export default class BookingEntity implements Omit<Booking, 'id'> {
  @ApiProperty({
    type: Date,
    description: 'Start time of the booking',
  })
  startTime: Date;

  @ApiProperty({
    type: Date,
    description: 'End time of the booking',
  })
  endTime: Date;
  @ApiProperty({
    type: Number,
    description: 'Room ID of the booked room',
  })
  roomId: number;
  @ApiProperty({
    type: Number,
    description: 'User ID of the user who books',
  })
  userId: number;

  constructor(args: BookingEntity) {
    this.startTime = convertDateToUTC(args.startTime);
    this.endTime = convertDateToUTC(args.endTime);
    this.roomId = args.roomId;
    this.userId = args.userId;
  }
}
