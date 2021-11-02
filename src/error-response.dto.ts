import { ApiProperty } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

export default class ErrorResponseDto {
  @ApiProperty({ type: Number })
  statusCode: number;
  @ApiProperty({
    oneOf: [
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      { type: 'string' },
    ],
  })
  message: ValidationError[] | string;
  @ApiProperty({ type: String })
  error: string;
}
