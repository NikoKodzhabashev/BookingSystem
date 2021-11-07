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

      availableFrom: new Date('2021-11-04T10:00:00Z'),
      availableTo: new Date('2021-11-04T20:00:00Z'),
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

async function addUser() {
  await prisma.user.create({
    data: {
      email: 'admin1@example.com',
      password: '$2a$12$PDe4PuH0N.2ND9/E1HwWXOTZX2anE06S6iWalR4Ei6BVTw887P5Fe',
    },
  });
}
async function main() {
  await addCompanies();
  await addUser();
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
