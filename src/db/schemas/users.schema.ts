import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid().primaryKey().notNull().defaultRandom(),
    username: varchar('username', { length: 100 }).notNull().unique(),
});
