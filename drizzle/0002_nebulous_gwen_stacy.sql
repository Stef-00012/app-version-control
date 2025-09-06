ALTER TABLE `versions` ADD `pinned` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `apps` DROP COLUMN `platforms`;