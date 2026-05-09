CREATE TYPE "public"."game_phase" AS ENUM('group_stage', 'round_of_16', 'quarterfinals', 'semifinals', 'third_place', 'final');--> statement-breakpoint
CREATE TABLE "stadiums" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"city" text NOT NULL,
	"country" text NOT NULL,
	"country_code" text NOT NULL,
	"capacity" integer NOT NULL,
	"timezone" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "phase" SET DATA TYPE "public"."game_phase" USING "phase"::"public"."game_phase";--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "round" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "stadium_id" text;--> statement-breakpoint
ALTER TABLE "guesses" ADD COLUMN "is_joker" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_stadium_id_stadiums_id_fk" FOREIGN KEY ("stadium_id") REFERENCES "public"."stadiums"("id") ON DELETE no action ON UPDATE no action;