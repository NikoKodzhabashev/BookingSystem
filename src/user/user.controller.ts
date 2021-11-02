import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import CreatedUserDto from './dto/created-user.dto';
import { UserService } from './user.service';
import ErrorResponseDto from 'src/error-response.dto';
import { Response } from 'express';
import { expiresInDateFormat } from 'src/auth/jwt/expiresIn';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GetCurrentUser } from 'src/get-user.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiResponse({
    status: 204,
    description: 'The user was successfully created.',
  })
  @HttpCode(204)
  @ApiBadRequestResponse({
    description: 'Bad Request.',
    type: ErrorResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOkResponse({
    description: 'The user was successfully fetched.',
    type: CreatedUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
    type: ErrorResponseDto,
  })
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { user, token } = await this.userService.login(loginUserDto);
    res
      .cookie('access_token', token, {
        httpOnly: true,
        domain: 'localhost',
        expires: expiresInDateFormat,
      })
      .send(user);
  }

  @Get('me')
  @ApiOkResponse({
    description: 'The user was successfully fetched.',
    type: CreatedUserDto,
  })
  @UseGuards(JwtAuthGuard)
  async getLoggedUser(@GetCurrentUser() user: CreatedUserDto) {
    return user;
  }
}
