import { User as UserSchema } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export default class CreatedUserDto implements Omit<UserSchema, 'password'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  constructor(args: CreatedUserDto) {
    this.id = args.id;
    this.email = args.email;
  }
}
