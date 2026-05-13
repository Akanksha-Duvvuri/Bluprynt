CREATE TYPE "public"."email_status" AS ENUM('pending', 'sent', 'delivered', 'bounced', 'failed');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('new', 'read', 'responded', 'archived', 'spam');--> statement-breakpoint
CREATE TABLE "email_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(50) NOT NULL,
	"submission_id" integer,
	"to_address" varchar(255) NOT NULL,
	"from_address" varchar(255) NOT NULL,
	"reply_to" varchar(255),
	"subject" varchar(500) NOT NULL,
	"status" "email_status" DEFAULT 'pending' NOT NULL,
	"resend_id" varchar(100),
	"error" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(255) NOT NULL,
	"company" varchar(200),
	"message" text NOT NULL,
	"detected_topic" varchar(50),
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"prospect_email_log_id" integer,
	"owner_email_log_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"num" varchar(10) NOT NULL,
	"title" varchar(200) NOT NULL,
	"line" varchar(300) NOT NULL,
	"description" text NOT NULL,
	"region" varchar(50),
	"tag" varchar(200),
	"category" varchar(100),
	"deliverables" text,
	"when_to_engage" text,
	"featured" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
