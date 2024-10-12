import type { InferSelectModel } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const Gender = pgEnum('gender', ['MALE', 'FEMALE']);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  firstName: varchar('firstName', { length: 255 }).notNull(),
  lastName: varchar('lastName', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  gender: Gender('gender').notNull(),
  jobTitle: varchar('jobTitle', { length: 255 }).notNull(),
  isAdmin: boolean('is_admin').notNull().default(false),
  password: text('password').notNull(),
  isVerified: boolean('is_verified').notNull().default(false),
  salt: text('salt').notNull(),
  code: text('code').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const selectUserSchema = createSelectSchema(users, {
  email: schema =>
    schema.email.email().regex(/^([\w.%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/i),
});

export const verifyUserSchema = z.object({
  query: selectUserSchema.pick({
    email: true,
    code: true,
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
    password: true,
  }),
});

export const addUserSchema = z.object({
  body: selectUserSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    gender: true,
    jobTitle: true,
    password: true,
    salt: true,
    code: true
  }),
});

export const updateUserSchema = z.object({
  body: selectUserSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    gender: true,
    jobTitle: true,
    password: true,
    salt: true,
    code: true
  }).partial(),
});

export const newUserSchema = z.object({
  body: selectUserSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    gender: true,
    jobTitle: true,
    password: true,
  }),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = z.infer<typeof newUserSchema>['body'];
export type UpdateUser = z.infer<typeof updateUserSchema>['body'];
