import { Company, Prisma, PrismaClient } from '@prisma/client';

function buildRooms(company: Company, length = 10): Prisma.RoomCreateInput[] {
  return [...new Array(length)].map((_, index) => {
    return {
      name: `${company.name}-${index + 1}`,
      company: {
        connect: {
          id: company.id,
        },
      },
      availableFrom: new Date('10/30/2021 10:00:00'),
      availableTo: new Date('10/30/2021 20:00:00'),
    };
  });
}

function buildCompanies(): Prisma.CompanyCreateInput[] {
  const companies = ['COKE', 'PEPSI'];
  return companies.map((company) => {
    return {
      name: company,
    };
  });
}
const prisma = new PrismaClient();

async function addRooms(company: Company) {
  const rooms = buildRooms(company);
  for (const room of rooms) {
    await prisma.room.create({
      data: room,
    });
  }
}

async function addCompanies() {
  const companies = buildCompanies();
  for (const company of companies) {
    await prisma.company.create({
      data: company,
    });
  }
}
async function main() {
  await addCompanies();

  const companies = await prisma.company.findMany();

  companies.map(addRooms);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
