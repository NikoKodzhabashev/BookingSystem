import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prismaService: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, userId: number) {
    const booking = await this.prismaService.booking.findFirst({
      where: {
        startTime: createBookingDto.startTime,
        endTime: createBookingDto.endTime,
      },
    });

    if (!booking) {
      await this.prismaService.booking.create({
        data: { ...createBookingDto, userId },
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
