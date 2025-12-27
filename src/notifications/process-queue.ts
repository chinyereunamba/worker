import { getPendingNotifications, markAsSent } from "../db/queries";
import { dispatchNotification } from "./dispatcher";
import { emailService } from "../email/sender";

export async function processQueue() {
  const jobs = await getPendingNotifications();

  for (const job of jobs) {
    const jobPayload =
      typeof job.payload === "string" ? JSON.parse(job.payload) : job.payload;
    try {
      const { subject, body } = dispatchNotification(job.type, jobPayload);

      await emailService.sendEmail({
        to: job.recipientEmail,
        subject: subject!,
        html: body!,
      });
      await markAsSent(job.id);
    } catch (err) {
      console.error("Failed job:", job.id, err);
    }
  }
}

