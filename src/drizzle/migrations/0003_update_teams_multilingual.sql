CREATE TABLE "team_translations" (
	"id" text PRIMARY KEY NOT NULL,
	"team_id" text NOT NULL,
	"language_code" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "team_translations_team_id_language_code_unique" UNIQUE("team_id","language_code")
);
--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "fifa_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "confederation" text NOT NULL;--> statement-breakpoint
ALTER TABLE "team_translations" ADD CONSTRAINT "team_translations_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_fifa_code_unique" UNIQUE("fifa_code");