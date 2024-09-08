import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function run() {
  await prisma.user.deleteMany();

  const promises = [];

  for (let i = 0; i < 10; i++) {
    promises.push(
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          age: Math.floor(Math.random() * 100),
          city: faker.location.city(),
        },
      }),
    );
  }

  await Promise.all(promises);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
