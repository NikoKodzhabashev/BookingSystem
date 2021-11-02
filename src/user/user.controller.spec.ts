import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as request from 'supertest';

const testUser = {
  email: 'test@example.com',
  password: '123456789',
};

describe('UserController', () => {
  let app: INestApplication;

  let controller: UserController;

  const mockUserService = {
    create: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    mockUserService.create.mockReturnValue({});

    return request(app.getHttpServer())
      .post('/user')
      .send(testUser)
      .expect(204);
  });

  it('should be able to login', async () => {
    mockUserService.login.mockReturnValue(testUser);
    expect(await controller.login(testUser)).toEqual(testUser);
  });
});
