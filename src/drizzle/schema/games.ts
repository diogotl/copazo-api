import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { teams } from "./teams";
import { stadiums } from "./stadiums";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const games = pgTable("games", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  date: timestamp("date").notNull(),
  firstTeamId: text("first_team_id")
    .notNull()
    .references(() => teams.id),
  secondTeamId: text("second_team_id")
    .notNull()
    .references(() => teams.id),
  phase: text("phase").notNull(),
  group: text("group"),
  stadiumId: text("stadium_id").references(() => stadiums.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Game = InferSelectModel<typeof games>;
export type CreateGameData = InferInsertModel<typeof games>;
