import type { NewUrl } from '@/schema/url';
import type { NewUser } from '@/schema/user';
import type { NewVisitHistory } from '@/schema/visit-history';
import process from 'node:process';
import { addUrl, addVisit } from '@/services/url-services';
import { addUser } from '@/services/user-services';
import { faker } from '@faker-js/faker';
import consola from 'consola';

const NUM_USERS = 10;
const MAX_URLS_PER_USER = 5;
const MAX_VISITS_PER_URL = 10;

function generateUser(): NewUser {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    jobTitle: faker.person.jobTitle(),
    password: faker.internet.password(),
  };
}

function generateUrl(userId: string): NewUrl {
  return {
    redirectURL: faker.internet.url(),
    userId,
  };
}

function generateVisitHistory(urlId: string, userId: string): NewVisitHistory {
  return {
    urlId,
    userId,
  };
}

async function seedDatabase() {
  consola.info('Starting database seeding...');

  for (let i = 0; i < NUM_USERS; i++) {
    const userData = generateUser();
    consola.info(`Creating user: ${userData.email}`);

    try {
      const { user: newUser } = await addUser(userData);

      const numUrls = faker.number.int({ min: 1, max: MAX_URLS_PER_USER });
      for (let j = 0; j < numUrls; j++) {
        const urlData = generateUrl(newUser.id);
        consola.info(`Creating URL for user: ${newUser.email}`);

        try {
          const { newURL } = await addUrl(urlData);

          const numVisits = faker.number.int({ min: 1, max: MAX_VISITS_PER_URL });
          for (let k = 0; k < numVisits; k++) {
            const visitData = generateVisitHistory(newURL.id, newUser.id);
            consola.info(`Creating visit history for URL: ${newURL.shortID}`);

            try {
              await addVisit(visitData);
            }
            catch (error) {
              consola.error(`Error creating visit history: ${error}`);
            }
          }
        }
        catch (error) {
          consola.error(`Error creating URL: ${error}`);
        }
      }
    }
    catch (error) {
      consola.error(`Error creating user: ${error}`);
    }
  }

  consola.success('Database seeding completed successfully!');
}

seedDatabase().then(() => {
  consola.info('Seeding process finished. Exiting...');
  process.exit(0);
}).catch((error) => {
  consola.error('Fatal error during database seeding:', error);
  process.exit(1);
});
