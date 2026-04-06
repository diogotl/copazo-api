import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { games } from "./games";
import { users } from "./users";

export const results = pgTable("results", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  gameId: text("game_id")
    .notNull()
    .references(() => games.id)
    .unique(),
  firstTeamScore: integer("first_team_score").notNull(),
  secondTeamScore: integer("second_team_score").notNull(),
  insertedBy: text("inserted_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});
