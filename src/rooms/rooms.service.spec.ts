import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let service: RoomsService;

  const mockPrismaService = {
    room: {
      findMany: jest.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all rooms from the query', async () => {
    const companyId = 1;
    const allRooms = [
      {
        id: Math.random(),
        name: 'Test Name',
        availableFrom: new Date(),
        availableTo: new Date(),
        companyId,
        bookings: [{ startTime: new Date(), endTime: new Date() }],
      },
    ];
    mockPrismaService.room.findMany.mockReturnValue(allRooms);

    expect(await service.findAll(companyId)).toBe(allRooms);
  });
});
