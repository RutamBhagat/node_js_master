import type { InferSelectModel } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const Gender = pgEnum('gender', ['MALE', 'FEMALE']);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  first_name: varchar('first_name', { length: 255 }).notNull(),
  last_name: varchar('last_name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  gender: Gender('gender').notNull(),
  job_title: varchar('job_title', { length: 255 }).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const selectUserSchema = createSelectSchema(users, {
  email: schema =>
    schema.email.email().regex(/^([\w.%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/i),
});

export const verifyUserSchema = z.object({
  query: selectUserSchema.pick({
    email: true,
  }),
});

export const deleteUserSchema = z.object({
  body: selectUserSchema.pick({
    email: true,
  }),
});

export const loginSchema = z.object({
  body: selectUserSchema.pick({
    email: true,
  }),
});

export const addUserSchema = z.object({
  body: selectUserSchema.pick({
    first_name: true,
    last_name: true,
    email: true,
    gender: true,
  }),
});

export const updateUserSchema = z.object({
  body: selectUserSchema.pick({
    first_name: true,
    last_name: true,
    email: true,
    gender: true,
    job_title: true,
  }).partial(),
});

export const newUserSchema = z.object({
  body: selectUserSchema.pick({
    first_name: true,
    last_name: true,
    email: true,
    gender: true,
    job_title: true,
  }),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = z.infer<typeof newUserSchema>['body'];
export type UpdateUser = z.infer<typeof updateUserSchema>['body'];
