import { ApiProperty } from '@nestjs/swagger';
import LoginUserDto from './login-user.dto';

export default class LoggedUserDto extends LoginUserDto {
  @ApiProperty()
  accessToken: string;

  constructor(args: LoggedUserDto) {
    super(args);
    Object.assign(this, args);
  }
}
