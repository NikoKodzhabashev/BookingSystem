import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import LoggedUserDto from './dto/logged-user.dto';
import LoginUserDto from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async create(createUserDto: Readonly<CreateUserDto>) {
    const user = await this.getUser(createUserDto);

    if (user) {
      throw new ConflictException();
    }

    await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: await this.authService.hashPassword(createUserDto.password),
      },
    });
  }

  async login(loginUserDto: Readonly<LoginUserDto>) {
    const user = await this.getUser(loginUserDto);

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordValid = await this.authService.comparePasswords(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const token = await this.authService.generateJwt({
      id: user.id,
      email: user.email,
    });

    return new LoggedUserDto({ ...user, accessToken: token });
  }

  private getUser(user: Readonly<CreateUserDto>) {
    return this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });
  }
}
