ALTER TABLE `category_value` ADD `chunk_variations` json DEFAULT ('[]') NOT NULL;--> statement-breakpoint
ALTER TABLE `prompt_category_mapping` ADD `variation` text;