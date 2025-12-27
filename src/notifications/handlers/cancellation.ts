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

// Booking cancellation email
export const bookingCancellationEmail = (payload: {
  appointment: Appointment;
  service: Service;
  business: Business;
}): EmailContent => {
  const { appointment, service, business } = payload;
  const content = `
    <h2>Booking Cancelled</h2>
    <p>Dear ${appointment.customerName},</p>
    <p>Your booking with ${business.name} has been cancelled.</p>
    
    <div class="details">
      <p><strong>Service:</strong> ${service.name}</p>
      <p><strong>Date:</strong> ${formatDate(appointment.appointmentDate)}</p>
      <p><strong>Time:</strong> ${formatTime(
        appointment.startTime
      )} - ${formatTime(appointment.endTime)}</p>
    </div>
    
    <p>If you would like to make a new booking, please visit our website.</p>
    
    <p>Thank you for using BiaBook!</p>
  `;

  return {
    subject: "Booking Cancellation Confirmation",
    body: baseTemplate(content),
  };
};

export const businessCancellationEmail = (payload: {
  appointment: Appointment;
  service: Service;
  business: Business;
  viewBookingUrl: string;
  cancellationReason?: string;
}):EmailContent  => {
  const { appointment, service, viewBookingUrl, cancellationReason } = payload;

  const content = `
    <h2>Booking Cancelled</h2>
    <p>Hi ${payload.business.name},</p>
    <p>The following booking has been cancelled by the customer:</p>

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
        cancellationReason
          ? `<p><strong>Cancellation Reason:</strong> ${cancellationReason}</p>`
          : ""
      }
    </div>

    <p>
      View booking details here: 
      <a href="${viewBookingUrl}" class="button">View Booking</a>
    </p>

    <p>Please update your schedule accordingly.</p>
  `;

  return {
    subject: "Booking Cancellation Notice",
    body: baseTemplate(content),
  };
};
