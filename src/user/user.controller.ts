import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateUserDto from './dto/create-user.dto';
import LoggedUserDto from './dto/logged-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 204,
    description: 'The user was successfully created.',
  })
  @HttpCode(204)
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOkResponse({ description: 'The user was successfully fetched.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiCreatedResponse({ type: LoggedUserDto })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }
}
