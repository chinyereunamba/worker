import {
  bookingConfirmationEmail,
  businessNewBookingEmail,
} from "./handlers/booking";
import {
  bookingCancellationEmail,
  businessCancellationEmail,
} from "./handlers/cancellation";
import { bookingRescheduledEmail } from "./handlers/reschedule";
import {
  business30mReminderEmail,
  bookingReminder2hEmail,
  bookingReminder30mEmail,
  bookingReminderEmail,
} from "./handlers/reminder";

export function dispatchNotification(type: string, payload: any) {
  switch (type) {
    case "booking_confirmation":
      return bookingConfirmationEmail(payload);
    case "booking_cancellation":
      return bookingCancellationEmail(payload);
    case "booking_rescheduled":
      return bookingRescheduledEmail(payload);
    case "booking_reminder_24h":
      return bookingReminderEmail(payload);
    case "booking_reminder_2h":
      return bookingReminder2hEmail(payload);
    case "booking_reminder_30m":
      return bookingReminder30mEmail(payload);
    case "business_new_booking":
      return businessNewBookingEmail(payload);
    case "business_booking_cancelled":
      return businessCancellationEmail(payload);
    case "business_booking_reminder":
      return business30mReminderEmail(payload);
    default:
      throw new Error(`Unknown notification type: ${type}`);
  }
}
