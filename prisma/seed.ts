import { faker } from '@faker-js/faker';
import { connect, model } from 'mongoose';
import { UserSchema } from 'src/users/entities/user.entity';

async function runSeed() {
  const mongoUrl =
    process.env.MONGO_URL || 'mongodb://localhost:27017/teste-caches';
  await connect(mongoUrl);

  const UserModel = model('User', UserSchema);

  await UserModel.deleteMany({});

  const users = [];

  for (let i = 0; i < 60; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: Math.floor(Math.random() * 100),
      city: faker.location.city(),
    });
  }

  await UserModel.insertMany(users);

  console.log('Seed complete: Users inserted');
}

runSeed()
  .then(() => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1);
  });
