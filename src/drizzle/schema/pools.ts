import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./users";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const pools = pgTable("pools", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  code: text("code").notNull().unique(),
  ownerId: text("owner_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Pool = InferSelectModel<typeof pools>;
export type CreatePoolData = InferInsertModel<typeof pools>;

export type Participant = InferSelectModel<typeof participants>;
export type CreateParticipantData = InferInsertModel<typeof participants>;

export const participants = pgTable(
  "participants",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    poolId: text("pool_id")
      .notNull()
      .references(() => pools.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    unq: unique().on(t.userId, t.poolId),
  }),
);
