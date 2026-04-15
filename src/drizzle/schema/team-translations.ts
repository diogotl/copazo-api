import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { teams } from "./teams";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const teamTranslations = pgTable(
  "team_translations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    teamId: text("team_id")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    languageCode: text("language_code").notNull(), // ISO 639-1: en, pt, es, fr, de, etc.
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    unq: unique().on(t.teamId, t.languageCode),
  }),
);

export type TeamTranslation = InferSelectModel<typeof teamTranslations>;
export type CreateTeamTranslationData = InferInsertModel<typeof teamTranslations>;
