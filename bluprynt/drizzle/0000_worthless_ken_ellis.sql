CREATE TYPE "public"."project_status" AS ENUM('live', 'review', 'complete', 'ongoing');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"num" varchar(50) NOT NULL,
	"name" varchar(200) NOT NULL,
	"name_em" varchar(200) NOT NULL,
	"sector" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"scope" varchar(200) NOT NULL,
	"status" "project_status" DEFAULT 'complete',
	"client" varchar(200),
	"location" varchar(200),
	"tools" text,
	"challenge" text NOT NULL,
	"approach" text NOT NULL,
	"outcome" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"quote" text NOT NULL,
	"author_name" varchar(200) NOT NULL,
	"author_title" varchar(200),
	"author_company" varchar(200),
	"related_project_slug" varchar(100),
	"featured" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"name" varchar(200),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
