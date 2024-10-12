import process from 'node:process';
import consola from 'consola';
// import { mockUsers } from './mock/mock_users';
// import { addUser } from '@/services/user-services';

async function main() {
  consola.log('Seed start');
  try {
    // for (const user of mockUsers) {
    // await addUser(user);
    // }

    consola.log('Seed done');
  }
  catch (error) {
    consola.error('Error seeding database:', error);
  }

  process.exit(0);
}

main().catch((err) => {
  consola.error(err);
  process.exit(1);
});
