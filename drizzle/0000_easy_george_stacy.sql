CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`message` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`reply_to` text DEFAULT '' NOT NULL,
	`story` text DEFAULT '' NOT NULL,
	`is_read` integer DEFAULT 0 NOT NULL,
	`alerted_at` integer,
	`client_id` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `notes_client_id_unique` ON `notes` (`client_id`);--> statement-breakpoint
CREATE INDEX `notes_created_idx` ON `notes` (`created_at`);--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`bucket` integer NOT NULL,
	`count` integer DEFAULT 0 NOT NULL
);
