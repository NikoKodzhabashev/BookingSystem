import { User as UserSchema } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export default class UserEntity implements Omit<UserSchema, 'password'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  accessToken: string;

  constructor(args: UserEntity) {
    Object.assign(this, args);
  }
}
