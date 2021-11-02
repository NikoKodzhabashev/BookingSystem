import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { GetCurrentUser } from 'src/get-user.decorator';
import ErrorResponseDto from 'src/error-response.dto';
import CreatedUserDto from 'src/user/dto/created-user.dto';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 204,
    description: 'The booking was successfully created.',
  })
  @HttpCode(204)
  @ApiForbiddenResponse({ description: 'Forbidden.', type: ErrorResponseDto })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
    type: ErrorResponseDto,
  })
  create(
    @GetCurrentUser() user: CreatedUserDto,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingsService.create(createBookingDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'The booking was successfully deleted.',
  })
  @HttpCode(204)
  @ApiForbiddenResponse({ description: 'Forbidden.', type: ErrorResponseDto })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Not Found.', type: ErrorResponseDto })
  remove(@Param('id') id: number) {
    return this.bookingsService.remove(id);
  }
}
