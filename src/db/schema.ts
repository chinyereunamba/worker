import { sql } from "drizzle-orm";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";

// src/server/notifications/schema.ts
export const createTable = sqliteTableCreator((name) => `biabook_${name}`);

export const notificationQueue = createTable(
  "notification_queue",
  (d) => ({
    id: d
      .text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    type: d.text("type").notNull(),
    recipientId: d.text("recipient_id").notNull(),
    recipientType: d
      .text("recipient_type", { enum: ["business", "customer"] })
      .notNull(),
    recipientEmail: d.text("recipient_email").notNull(),
    recipientPhone: d.text("recipient_phone"),
    payload: d.text("payload").notNull(),
    scheduledFor: d.integer("scheduled_for", { mode: "timestamp" }).notNull(),
    status: d
      .text("status", { enum: ["pending", "processed", "failed"] })
      .default("pending")
      .notNull(),
    attempts: d.integer("attempts").default(0).notNull(),
    lastAttemptAt: d.integer("last_attempt_at", { mode: "timestamp" }),
    error: d.text("error"),
    createdAt: d
      .integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d
      .integer("updated_at", { mode: "timestamp" })
      .$onUpdate(() => new Date()),
  }),
  (t) => [
    index("notification_queue_status_idx").on(t.status),
    index("notification_queue_scheduled_for_idx").on(t.scheduledFor),
    index("notification_queue_recipient_id_idx").on(t.recipientId),
    index("notification_queue_type_idx").on(t.type),
  ]
);
