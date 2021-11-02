import { Room as RoomSchema } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class Booking {
  @ApiProperty()
  startTime: Date;
  @ApiProperty()
  endTime: Date;
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
