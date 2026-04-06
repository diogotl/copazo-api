CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"apple_id" text,
	"password_hash" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_apple_id_unique" UNIQUE("apple_id")
);
