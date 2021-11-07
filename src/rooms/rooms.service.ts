import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prismaService: PrismaService) {}

  async findAll(companyId?: number) {
    const rooms = await this.prismaService.room.findMany({
      where: {
        companyId: companyId || undefined,
      },
      include: {
        bookings: {
          select: {
            userId: true,
            startTime: true,
            endTime: true,
            id: true,
          },
        },
      },
    });

    return rooms;
  }
}
