import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const apps = sqliteTable("apps", {
	appId: integer("app_id").notNull().primaryKey({
		autoIncrement: true,
	}),
	appName: text("app_name").notNull(),
	ownerId: integer("owner_id").notNull(),
	pinned: integer("pinned", {
		mode: "boolean"
	})
		.default(false)
});
