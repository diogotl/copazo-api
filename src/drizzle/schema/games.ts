import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const games = pgTable("games", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  date: timestamp("date").notNull(),
  firstTeamCountryCode: text("first_team_country_code").notNull(),
  secondTeamCountryCode: text("second_team_country_code").notNull(),
  phase: text("phase").notNull(),
  group: text("group"),
  createdAt: timestamp("created_at").defaultNow(),
});
