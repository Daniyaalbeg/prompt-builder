import { bigint, boolean, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable('auth_user', {
  id: varchar("id", {
		length: 15 // change this when using custom user ids
	}).primaryKey(),
  username: text('username'),
  email: varchar('email', { length: 255 }),
});

export const session = mysqlTable("auth_session", {
	id: varchar("id", {
		length: 128
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull(),
	activeExpires: bigint("active_expires", {
		mode: "number"
	}).notNull(),
	idleExpires: bigint("idle_expires", {
		mode: "number"
	}).notNull()
});

export const key = mysqlTable("auth_key", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 15
	})
		.notNull(),
	primaryKey: boolean("primary_key").notNull(),
	hashedPassword: varchar("hashed_password", {
		length: 255
	}),
	expires: bigint("expires", {
		mode: "number"
	})
});