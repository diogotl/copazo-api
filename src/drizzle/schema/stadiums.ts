import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const stadiums = pgTable("stadiums", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(), // Stadium name (e.g., "MetLife Stadium")
  city: text("city").notNull(), // City name (e.g., "New York")
  country: text("country").notNull(), // Country (e.g., "United States")
  countryCode: text("country_code").notNull(), // ISO code (US, CA, MX)
  capacity: integer("capacity").notNull(), // Stadium capacity
  timezone: text("timezone").notNull(), // Timezone for game times (e.g., "America/New_York")
  createdAt: timestamp("created_at").defaultNow(),
});

export type Stadium = InferSelectModel<typeof stadiums>;
export type CreateStadiumData = InferInsertModel<typeof stadiums>;
