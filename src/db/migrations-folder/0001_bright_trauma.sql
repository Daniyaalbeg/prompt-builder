ALTER TABLE `prompt` MODIFY COLUMN `created_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `prompt` MODIFY COLUMN `updated_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `prompt_category_mapping` DROP COLUMN `id`;--> statement-breakpoint
ALTER TABLE `prompt_category_mapping` ADD PRIMARY KEY(`category_value_id`,`prompt_id`);