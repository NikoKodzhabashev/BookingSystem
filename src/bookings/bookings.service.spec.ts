import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

const createBookingDto: CreateBookingDto = {
  endTime: new Date(),
  startTime: new Date(),
  roomId: 1,
};

describe('BookingsService', () => {
  let service: BookingsService;

  const mockPrismaService = {
    booking: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    room: {
      findFirst: jest.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throws ConflictException when there is no user', async () => {
    mockPrismaService.booking.findFirst.mockResolvedValue(createBookingDto);
    mockPrismaService.room.findFirst.mockResolvedValue({
      availableFrom: new Date(1980),
    });
    await expect(service.create(createBookingDto, 1)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throws BadRequestException when there is no user', async () => {
    mockPrismaService.booking.findFirst.mockResolvedValue(createBookingDto);
    mockPrismaService.room.findFirst.mockResolvedValue({
      availableFrom: new Date(),
    });
    await expect(service.create(createBookingDto, 1)).rejects.toThrow(
      BadRequestException,
    );
  });
});
