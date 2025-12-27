import { db } from "./index";
import { notificationQueue } from "./schema"; // copy schema or re-define minimal version
import { and, lte, eq } from "drizzle-orm";

export async function getPendingNotifications() {
  return db
    .select()
    .from(notificationQueue)
    .where(
      and(
        eq(notificationQueue.status, "pending"),
        lte(notificationQueue.scheduledFor, new Date())
      )
    );
}

export async function markAsSent(id: string) {
  return db
    .update(notificationQueue)
    .set({ status: "processed" })
    .where(eq(notificationQueue.id, id));
}
