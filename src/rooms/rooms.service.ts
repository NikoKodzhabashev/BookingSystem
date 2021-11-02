import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const rooms = await this.prismaService.room.findMany({
      include: {
        bookings: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    return rooms;
  }
}
