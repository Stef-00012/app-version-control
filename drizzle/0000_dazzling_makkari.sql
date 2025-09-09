CREATE TABLE `apps` (
	`app_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`app_name` text NOT NULL,
	`owner_id` integer NOT NULL,
	`pinned` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `platforms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`tokens` text DEFAULT '[]' NOT NULL,
	`admin` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `versions` (
	`version_code` text NOT NULL,
	`version_name` text NOT NULL,
	`owner` integer NOT NULL,
	`app_name` integer NOT NULL,
	`platforms` text DEFAULT '{}' NOT NULL,
	`pinned` integer DEFAULT false,
	PRIMARY KEY(`app_name`, `version_code`)
);
