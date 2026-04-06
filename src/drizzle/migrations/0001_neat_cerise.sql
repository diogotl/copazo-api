CREATE TABLE "games" (
	"id" text PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"first_team_country_code" text NOT NULL,
	"second_team_country_code" text NOT NULL,
	"phase" text NOT NULL,
	"group" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "guesses" (
	"id" text PRIMARY KEY NOT NULL,
	"first_team_score" integer NOT NULL,
	"second_team_score" integer NOT NULL,
	"points" integer,
	"game_id" text NOT NULL,
	"participant_id" text NOT NULL,
	"pool_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "guesses_participant_id_game_id_unique" UNIQUE("participant_id","game_id")
);
--> statement-breakpoint
CREATE TABLE "participants" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"pool_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "participants_user_id_pool_id_unique" UNIQUE("user_id","pool_id")
);
--> statement-breakpoint
CREATE TABLE "pools" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"code" text NOT NULL,
	"owner_id" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "pools_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "results" (
	"id" text PRIMARY KEY NOT NULL,
	"game_id" text NOT NULL,
	"first_team_score" integer NOT NULL,
	"second_team_score" integer NOT NULL,
	"inserted_by" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "results_game_id_unique" UNIQUE("game_id")
);
--> statement-breakpoint
ALTER TABLE "guesses" ADD CONSTRAINT "guesses_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guesses" ADD CONSTRAINT "guesses_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guesses" ADD CONSTRAINT "guesses_pool_id_pools_id_fk" FOREIGN KEY ("pool_id") REFERENCES "public"."pools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_pool_id_pools_id_fk" FOREIGN KEY ("pool_id") REFERENCES "public"."pools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pools" ADD CONSTRAINT "pools_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_inserted_by_users_id_fk" FOREIGN KEY ("inserted_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;