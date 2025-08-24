CREATE TABLE `platforms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`icon` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`username` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL,
	`tokens` text DEFAULT '[]' NOT NULL,
	`admin` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `versions` (
	`version_code` text NOT NULL,
	`version_name` text NOT NULL,
	`owner` text NOT NULL,
	`platforms` text DEFAULT '{}' NOT NULL,
	PRIMARY KEY(`version_code`, `owner`)
);
