import type { NewUser } from '@/schema/user';
import process from 'node:process';
import { addUser } from '@/services/user-services';
import consola from 'consola';
import mockUsersData from './mock/mock_users.json';

export const mockUsers: NewUser[] = mockUsersData as NewUser[];

async function main() {
  consola.log('Seed start');
  try {
    for (const user of mockUsers) {
      await addUser(user);
    }

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
