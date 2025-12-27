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
}): EmailContent => {
  const { appointment, service, business } = payload;
  const cancellationUrl = `https://biabook.app/booking/${appointment.id}/cancel`;
  const content = `
    <h2>Booking Rescheduled</h2>
    <p>Dear ${appointment.customerName},</p>
    <p>Your booking with ${business.name} has been rescheduled.</p>
    
    <div class="details">
      <p><strong>Service:</strong> ${service.name}</p>
      <p><strong>New Date:</strong> ${formatDate(
        appointment.appointmentDate
      )}</p>
      <p><strong>New Time:</strong> ${formatTime(
        appointment.startTime
      )} - ${formatTime(appointment.endTime)}</p>
      <p><strong>Location:</strong> ${
        business.address ?? "Address not provided"
      }</p>
    </div>
    
    <p>If you need to cancel this booking, you can use the link below:</p>
    
    <p>
      <a href="${
        cancellationUrl
      }" style="color: #6b7280; text-decoration: underline;">Cancel Booking</a>
    </p>
    
    <p>Thank you for booking with ${business?.name}!</p>
  `;

  return {
    subject: "Your Booking Has Been Rescheduled",
    body: baseTemplate(content)
  };
};
