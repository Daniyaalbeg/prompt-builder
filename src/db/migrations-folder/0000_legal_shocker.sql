CREATE TABLE `ai_model` (
	`id` varchar(36) PRIMARY KEY NOT NULL,
	`is_available` boolean NOT NULL,
	`name` text NOT NULL);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` varchar(36) PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`meta_chunks` json NOT NULL,
	`negative_meta_chunks` json NOT NULL,
	`sort_order` smallint NOT NULL,
	`ai_id` varchar(36) NOT NULL);
--> statement-breakpoint
CREATE TABLE `category_value` (
	`id` varchar(36) PRIMARY KEY NOT NULL,
	`chunk` text NOT NULL,
	`category_id` varchar(36) NOT NULL,
	`image_url` text NOT NULL,
	`meta_chunks` json NOT NULL,
	`negative_meta_chunks` json NOT NULL,
	`ai_id` varchar(36) NOT NULL);
--> statement-breakpoint
CREATE TABLE `auth_key` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`primary_key` boolean NOT NULL,
	`hashed_password` varchar(255),
	`expires` bigint);
--> statement-breakpoint
CREATE TABLE `prompt` (
	`id` varchar(36) PRIMARY KEY NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`title` text NOT NULL,
	`subject` text NOT NULL,
	`prompt` text NOT NULL,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL);
--> statement-breakpoint
CREATE TABLE `prompt_category_mapping` (
	`id` varchar(36) PRIMARY KEY NOT NULL,
	`prompt_id` varchar(36) NOT NULL,
	`category_value_id` varchar(36) NOT NULL,
	`weight` smallint NOT NULL);
--> statement-breakpoint
CREATE TABLE `auth_session` (
	`id` varchar(128) PRIMARY KEY NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL);
--> statement-breakpoint
CREATE TABLE `auth_user` (
	`id` varchar(15) PRIMARY KEY NOT NULL,
	`username` text,
	`email` varchar(255));
