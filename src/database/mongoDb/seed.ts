import { faker } from '@faker-js/faker';
import { connect, model } from 'mongoose';
import { UserSchema } from 'src/users/entities/user.entity';

async function runSeed() {
  // Conectando ao MongoDB
  await connect('mongodb://localhost/teste-caches');

  // Definindo o modelo de usuário
  const UserModel = model('User', UserSchema);

  // Limpando a collection de usuários
  await UserModel.deleteMany({});

  // Gerando dados fictícios e populando o MongoDB
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.person.fullName(),
      age: Math.floor(Math.random() * 100),
      city: faker.location.city(),
    });
  }

  // Inserindo no banco de dados
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
