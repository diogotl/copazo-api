import { pgTable, text, timestamp, integer, unique } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { games } from "./games";
import { participants } from "./pools";
import { pools } from "./pools";
import { users } from "./users";

export const guesses = pgTable(
  "guesses",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    firstTeamScore: integer("first_team_score").notNull(),
    secondTeamScore: integer("second_team_score").notNull(),
    points: integer("points"),
    gameId: text("game_id")
      .notNull()
      .references(() => games.id),
    participantId: text("participant_id")
      .notNull()
      .references(() => participants.id),
    poolId: text("pool_id")
      .notNull()
      .references(() => pools.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    unq: unique().on(t.participantId, t.gameId),
  }),
);
