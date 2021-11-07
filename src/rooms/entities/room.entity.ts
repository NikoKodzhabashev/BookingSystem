import { Room as RoomSchema } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class Booking {
  @ApiProperty()
  startTime: Date;
  @ApiProperty()
  endTime: Date;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  id: number;
}
export default class RoomEntity implements RoomSchema {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  availableFrom: Date;
  @ApiProperty()
  availableTo: Date;
  @ApiProperty()
  companyId: number;
  @ApiProperty({ type: Booking, isArray: true })
  bookings: Booking[];
}
