import type { VersionPlatforms } from "@/types/db";
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const versions = sqliteTable(
	"versions",
	{
		versionCode: text("version_code").notNull(),
		versionName: text("version_name").notNull(),
		ownerId: integer("owner").notNull(),
		appId: integer("app_name").notNull(),
		platforms: text("platforms", {
			mode: "json",
		})
			.notNull()
			.default("{}")
			.$type<VersionPlatforms>(),
	},
	(table) => {
		return {
			pk: primaryKey({
				columns: [table.appId, table.versionCode],
			}),
		};
	},
);
