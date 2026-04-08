import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const teams = pgTable("teams", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  countryCode: text("country_code").notNull().unique(),
  flagUrl: text("flag_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Team = InferSelectModel<typeof teams>;
export type CreateTeamData = InferInsertModel<typeof teams>;
