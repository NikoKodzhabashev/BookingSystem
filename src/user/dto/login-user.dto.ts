import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email of the user.',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Password of the user.',
  })
  password: string;
}
