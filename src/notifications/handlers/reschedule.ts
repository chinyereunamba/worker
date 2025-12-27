import {
  type Appointment,
  type Business,
  type Service,
  baseTemplate,
  formatCurrency,
  formatDate,
  formatTime,
} from ".";
import type { EmailContent } from "../../types/notification";

// Booking rescheduled email
export const bookingRescheduledEmail = (payload: {
  appointment: Appointment;
  service: Service;
  business: Business;
  cancellationUrl: string;
}): EmailContent => {
  const content = `
    <h2>Booking Rescheduled</h2>
    <p>Dear ${payload.appointment.customerName},</p>
    <p>Your booking with ${payload.business.name} has been rescheduled.</p>
    
    <div class="details">
      <p><strong>Service:</strong> ${payload.service.name}</p>
      <p><strong>New Date:</strong> ${formatDate(
        payload.appointment.appointmentDate
      )}</p>
      <p><strong>New Time:</strong> ${formatTime(
        payload.appointment.startTime
      )} - ${formatTime(payload.appointment.endTime)}</p>
      <p><strong>Location:</strong> ${
        payload.business.address ?? "Address not provided"
      }</p>
    </div>
    
    <p>If you need to cancel this booking, you can use the link below:</p>
    
    <p>
      <a href="${
        payload.cancellationUrl
      }" style="color: #6b7280; text-decoration: underline;">Cancel Booking</a>
    </p>
    
    <p>Thank you for booking with ${payload.business?.name}!</p>
  `;

  return {
    subject: "Your Booking Has Been Rescheduled",
    body: baseTemplate(content)
  };
};
