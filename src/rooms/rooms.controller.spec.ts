import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

describe('RoomsController', () => {
  let controller: RoomsController;

  const mockedJwtAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };
  const mockedRoomService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        PrismaService,
        {
          provide: RoomsService,
          useValue: mockedRoomService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockedJwtAuthGuard)
      .compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all rooms', async () => {
    const allRooms = [
      {
        id: Math.random(),
        name: 'Test Name',
        availableFrom: new Date(),
        availableTo: new Date(),
        companyId: 1,
        bookings: [{ startTime: new Date(), endTime: new Date() }],
      },
    ];
    mockedRoomService.findAll.mockReturnValue(allRooms);
    expect(await controller.findAll()).toBe(allRooms);
  });
});
