import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
        startTime: createBookingDto.startTime,
        endTime: createBookingDto.endTime,
      },
    });
    if (!booking) {
      return await this.prismaService.booking.create({
        data: new BookingEntity({ ...createBookingDto, userId }),
      });
    } else {
      throw new ConflictException();
    }
  }

  async remove(id: number) {
    const booking = await this.prismaService.booking.findUnique({
      where: {
        id,
      },
    });
    if (!booking) {
      throw new NotFoundException();
    }
    await this.prismaService.booking.delete({
      where: {
        id,
      },
    });
  }
}
