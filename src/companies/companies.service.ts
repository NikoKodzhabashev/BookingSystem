import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const companies = await this.prismaService.company.findMany();
    return companies;
  }
}
