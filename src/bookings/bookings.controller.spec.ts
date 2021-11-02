import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import * as request from 'supertest';
import { CreateBookingDto } from './dto/create-booking.dto';

const createBookingDto: CreateBookingDto = {
  endTime: new Date(),
  startTime: new Date(),
  roomId: 1,
};

describe('BookingsController', () => {
  let controller: BookingsController;
  let app: INestApplication;

  const mockedJwtAuthGuard = { sign: jest.fn(() => true) };
  const mockBookingService = {
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingsService,
          useValue: mockBookingService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockedJwtAuthGuard)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    controller = module.get<BookingsController>(BookingsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create booking', () => {
    it('should receive 204 on created booking', async () => {
      mockBookingService.create.mockResolvedValue({});

      request(app.getHttpServer())
        .post('/bookings')
        .send(createBookingDto)
        .expect(204);
    });

    it('should receive 400 on created booking without require arg', async () => {
      return request(app.getHttpServer())
        .post('/bookings')
        .send({
          startTime: new Date(),
          roomId: 1,
        })
        .expect(400);
    });
  });

  it('should receive 204 on delete booking', async () => {
    mockBookingService.remove.mockResolvedValue({});

    return request(app.getHttpServer())
      .delete('/bookings/1')
      .send()
      .expect(204);
  });
});
