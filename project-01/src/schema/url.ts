import type { InferSelectModel } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { visitHistory } from './visit-history';

export const urls = pgTable('urls', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  shortID: text('short_id').notNull(),
  redirectURL: text('redirect_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const urlsRelations = relations(urls, ({ many }) => ({
  visitHistories: many(visitHistory),
}));

export const selectUrlSchema = createSelectSchema(urls, {
  shortID: schema => schema.shortID.min(1),
  redirectURL: schema => schema.redirectURL.url(),
});

export const addUrlSchema = z.object({
  body: selectUrlSchema.pick({
    redirectURL: true,
  }),
});

export const updateUrlSchema = z.object({
  body: selectUrlSchema.pick({
    shortID: true,
    redirectURL: true,
  }).partial(),
});

export const deleteUrlSchema = z.object({
  body: selectUrlSchema.pick({
    id: true,
  }),
});

export type Url = InferSelectModel<typeof urls>;
export type NewUrl = z.infer<typeof addUrlSchema>['body'];
export type UpdateUrl = z.infer<typeof updateUrlSchema>['body'];
