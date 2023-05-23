ALTER TABLE `category_value` ADD `image_url` text NOT NULL;--> statement-breakpoint
ALTER TABLE `prompt` ADD `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `prompt_category_mapping` ADD `weight` smallint NOT NULL;