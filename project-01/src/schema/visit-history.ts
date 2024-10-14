import { type InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { urls } from './url';
import { users } from './user';

export const visitHistory = pgTable('visit_history', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  urlId: uuid('url_id').notNull().references(() => urls.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const visitHistoryRelations = relations(visitHistory, ({ one }) => ({
  url: one(urls, {
    fields: [visitHistory.urlId],
    references: [urls.id],
  }),
  user: one(users, {
    fields: [visitHistory.userId],
    references: [users.id],
  }),
}));

export const selectVisitHistorySchema = createSelectSchema(visitHistory, {
  urlId: schema => schema.urlId.uuid(),
  userId: schema => schema.userId.uuid(),
});

export const addVisitHistorySchema = z.object({
  body: selectVisitHistorySchema.pick({
    urlId: true,
  }),
});

export const deleteVisitHistorySchema = z.object({
  body: selectVisitHistorySchema.pick({
    id: true,
  }),
});

export type VisitHistory = InferSelectModel<typeof visitHistory>;
export type NewVisitHistory = z.infer<typeof addVisitHistorySchema>['body'];
