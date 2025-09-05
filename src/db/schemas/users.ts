import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").notNull().primaryKey({
		autoIncrement: true,
	}),
	username: text("username").notNull(),
	password: text("password").notNull(),
	tokens: text("tokens", {
		mode: "json",
	})
		.notNull()
		.default([])
		.$type<string[]>(),
	admin: integer("admin", {
		mode: "boolean",
	})
		.notNull()
		.default(false),
});
