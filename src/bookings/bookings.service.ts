import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { convertDateToUTC } from 'src/helpers/date';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import BookingEntity from './entity/booking.entity';

@Injectable()
export class BookingsService {
  constructor(private prismaService: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, userId: number) {
    const room = await this.prismaService.room.findFirst({
      where: {
        id: createBookingDto.roomId,
      },
    });

    if (room.availableFrom.getTime() > createBookingDto.startTime.getTime()) {
      throw new BadRequestException();
    }

    const booking = await this.prismaService.booking.findFirst({
      where: {
        roomId: createBookingDto.roomId,
        startTime: convertDateToUTC(createBookingDto.startTime),
        endTime: convertDateToUTC(createBookingDto.endTime),
      },
    });
    if (!booking) {
      await this.prismaService.booking.create({
        data: new BookingEntity({ ...createBookingDto, userId }),
      });
    } else {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    await this.prismaService.booking.delete({
      where: {
        id,
      },
    });
  }
}
