import type { VersionPlatforms } from "@/types/db";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const versions = sqliteTable(
	"versions",
	{
		versionCode: text("version_code").notNull(),
		versionName: text("version_name").notNull(),
		owner: text("owner").notNull(),
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
				columns: [table.versionCode, table.owner],
			}),
		};
	},
);
