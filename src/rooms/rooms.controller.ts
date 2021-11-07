import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import RoomEntity from './entities/room.entity';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'Room list was successfully fetched.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({ type: RoomEntity, isArray: true })
  findAll(@Query('company') companyId: number) {
    return this.roomsService.findAll(companyId);
  }
}
