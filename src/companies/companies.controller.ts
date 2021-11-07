import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import CompanyDto from './dto/company.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Company list was successfully fetched.',
    type: CompanyDto,
  })
  findAll() {
    return this.companiesService.findAll();
  }
}
