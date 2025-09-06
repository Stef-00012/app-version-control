import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const platforms = sqliteTable("platforms", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull(),
});
