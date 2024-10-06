import process from 'node:process';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL,
  },
  // tablesFilter: ['project_1_*'],
  out: './drizzle',
} satisfies Config;
