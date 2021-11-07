import { Company } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export default class CompanyDto implements Company {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
