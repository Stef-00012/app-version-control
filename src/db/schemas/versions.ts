import type { VersionPlatforms } from "@/types/db";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const versions = sqliteTable("versions", {
	versionCode: text("version_code").notNull().primaryKey(),
	versionName: text("version_name").notNull(),
	platforms: text("platforms", {
        mode: "json"
    }).notNull().default("{}").$type<VersionPlatforms>(),
});
