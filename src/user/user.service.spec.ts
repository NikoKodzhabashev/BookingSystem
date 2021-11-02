import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import LoggedUserDto from './dto/logged-user.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const testUser = { email: 'test@example.com', password: '123' };

  const mockAuthService = {
    generateJwt: jest.fn(),
    comparePasswords: jest.fn(),
    hashPassword: jest.fn(),
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '10000s' },
          }),
        }),
      ],
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throws ConflictException if user already exist', async () => {
    mockPrismaService.user.findUnique.mockResolvedValue(testUser);
    await expect(service.create(testUser)).rejects.toThrow(ConflictException);
  });

  describe('Login scenarios', () => {
    it('should return the logged user', async () => {
      const accessToken = 'token:123321123x112';
      mockPrismaService.user.findUnique.mockResolvedValue(testUser);
      mockAuthService.generateJwt.mockResolvedValue(accessToken);
      mockAuthService.comparePasswords.mockResolvedValue(true);

      expect(await service.login(testUser)).toStrictEqual(
        new LoggedUserDto({ ...testUser, accessToken }),
      );
    });
    it('should throws NotFoundException when there is no user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      await expect(service.login(testUser)).rejects.toThrow(NotFoundException);
    });

    it('should throws UnauthorizedException when there is no user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(testUser);
      mockAuthService.comparePasswords.mockResolvedValue(false);

      await expect(service.login(testUser)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
