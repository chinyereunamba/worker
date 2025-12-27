// src/lib/email-templates/base.ts

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

export const bookingConfirmationEmail = async (payload: {
  appointment: Appointment;
  service: Service;
  business: Business;
  businessTimezone?: string;
}): Promise<EmailContent> => {
  const { appointment, business, service, businessTimezone } = payload;
  let timeDisplay = `${formatTime(appointment.startTime)} - ${formatTime(
    appointment.endTime
  )}`;
  let timezoneInfo = "";
  const rescheduleUrl = `https://biabook.app/booking/${appointment.id}/reschedule`;
  const cancellationUrl = `https://biabook.app/booking/${appointment.id}/cancel`;

  const content = `
    <h2>Booking Confirmation</h2>
    <p>Dear ${appointment.customerName},</p>
    <p>Your booking has been confirmed with ${business.name}.</p>
    
    <div class="details">
      <p><strong>Service:</strong> ${service.name}</p>
      <p><strong>Date:</strong> ${formatDate(appointment.appointmentDate)}</p>
      <p><strong>Time:</strong> ${timeDisplay}</p>
      ${timezoneInfo}
      <p><strong>Price:</strong> ${formatCurrency(service.price)}</p>
      <p><strong>Location:</strong> ${
        business.address ?? "Address not provided"
      }</p>
    </div>
    
    <p>If you need to make changes to your booking, you can use the links below:</p>
    
    <p>
      <a href="${rescheduleUrl}" class="button">Reschedule</a>
      <a href="${cancellationUrl}" style="margin-left: 10px; color: #6b7280; text-decoration: underline;">Cancel</a>
    </p>
    
    <p>Thank you for booking with ${business.name}!</p>
  `;

  return {
    subject: `Booking Confirmation`,
    body: baseTemplate(content),
  };
};

// Business notification email (new booking)
export const businessNewBookingEmail = (payload: {
  appointment: Appointment;
  service: Service;
}): EmailContent => {
  const { appointment, service } = payload;
  const viewBookingUrl = `https://biabook.app/booking/${appointment.id}`;
  const content = `
    <h2>New Booking</h2>
    <p>You have a new booking!</p>
    
    <div class="details">
      <p><strong>Customer:</strong> ${appointment.customerName}</p>
      <p><strong>Email:</strong> ${appointment.customerEmail}</p>
      <p><strong>Phone:</strong> ${appointment.customerPhone}</p>
      <p><strong>Service:</strong> ${service.name}</p>
      <p><strong>Date:</strong> ${formatDate(appointment.appointmentDate)}</p>
      <p><strong>Time:</strong> ${formatTime(
        appointment.startTime
      )} - ${formatTime(appointment.endTime)}</p>
      <p><strong>Price:</strong> ${formatCurrency(service.price)}</p>
      ${
        appointment?.notes
          ? `<p><strong>Notes:</strong> ${appointment.notes}</p>`
          : ""
      }
    </div>
    
    <p>
      <a href="${viewBookingUrl}" class="button">View Booking</a>
    </p>
  `;

  return {
    subject: `New Booking from ${appointment.customerName}`,
    body: baseTemplate(content),
  };
};
