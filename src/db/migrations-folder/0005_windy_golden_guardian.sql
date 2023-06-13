ALTER TABLE `category` ADD `suggested_values` smallint DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `category` ADD `suggested_values_reason` text DEFAULT ('') NOT NULL;