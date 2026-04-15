import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const teams = pgTable("teams", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(), // Default name (English)
  countryCode: text("country_code").notNull().unique(), // ISO 3166-1 alpha-2 (BR, PT, US)
  fifaCode: text("fifa_code").notNull().unique(), // FIFA 3-letter code (BRA, POR, USA)
  flagUrl: text("flag_url"),
  confederation: text("confederation").notNull(), // AFC, CAF, CONCACAF, CONMEBOL, OFC, UEFA
  createdAt: timestamp("created_at").defaultNow(),
});

export type Team = InferSelectModel<typeof teams>;
export type CreateTeamData = InferInsertModel<typeof teams>;
