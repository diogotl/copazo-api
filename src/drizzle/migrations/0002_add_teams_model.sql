CREATE TABLE "teams" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"country_code" text NOT NULL,
	"flag_url" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "teams_country_code_unique" UNIQUE("country_code")
);
--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "first_team_id" text;
--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "second_team_id" text;
--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_first_team_id_teams_id_fk" FOREIGN KEY ("first_team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_second_team_id_teams_id_fk" FOREIGN KEY ("second_team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "games" DROP COLUMN "first_team_country_code";
--> statement-breakpoint
ALTER TABLE "games" DROP COLUMN "second_team_country_code";
--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "first_team_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "games" ALTER COLUMN "second_team_id" SET NOT NULL;
