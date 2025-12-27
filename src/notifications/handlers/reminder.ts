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

// Booking reminder email with timezone support
export const bookingReminderEmail = async (payload: {
  appointment: Appointment;
  service: Service;
  business: Business;
  businessTimezone?: string;
}): Promise<EmailContent> => {
  const { business, service, businessTimezone, appointment } = payload;
  let timeDisplay = `${formatTime(appointment.startTime)} - ${formatTime(
    appointment.endTime
  )}`;
  let timezoneInfo = "";

  // If business has timezone information, show timezone-aware times

  const rescheduleUrl = `https://biabook.app/booking/${appointment.id}/reschedule`;
  const cancellationUrl = `https://biabook.app/booking/${appointment.id}/cancel`;
  const content = `
    <h2>Booking Reminder</h2>
    <p>Dear ${appointment.customerName},</p>
    <p>This is a reminder of your upcoming appointment with ${
      business.name
    }.</p>
    
    <div class="details">
      <p><strong>Service:</strong> ${service.name}</p>
      <p><strong>Date:</strong> ${formatDate(appointment.appointmentDate)}</p>
      <p><strong>Time:</strong> ${timeDisplay}</p>
      ${timezoneInfo}
      <p><strong>Location:</strong> ${
        business.address ?? "Address not provided"
      }</p>
    </div>
    
    <p>If you need to make changes to your booking, you can use the links below:</p>
    
    <p>
      <a href="${rescheduleUrl}" class="button">Reschedule</a>
      <a href="${cancellationUrl}" style="margin-left: 10px; color: #6b7280; text-decoration: underline;">Cancel</a>
    </p>
    
    <p>We look forward to seeing you!</p>
  `;

  return {
    subject: `Booking Reminder: ${appointment.customerName} at ${formatTime(
      appointment.startTime
    )}`,
    body: baseTemplate(content),
  };
};

// Booking reminder email with timezone support
export const bookingReminder2hEmail = async (payload: {
  appointment: Appointment;
  service: Service;
  business: Business;
  businessTimezone?: string;
}): Promise<EmailContent> => {
  const { business, service, businessTimezone, appointment } = payload;
  let timeDisplay = `${formatTime(appointment.startTime)} - ${formatTime(
    appointment.endTime
  )}`;
  let timezoneInfo = "";

  // If business has timezone information, show timezone-aware times

  const rescheduleUrl = `https://biabook.app/booking/${appointment.id}/reschedule`;
  const cancellationUrl = `https://biabook.app/booking/${appointment.id}/cancel`;
  const content = `
    <h2>Upcoming appointment Reminder</h2>
    <p>Dear ${appointment.customerName},</p>
    <p>This is a reminder of your upcoming appointment with ${
      business.name
    } is coming up in <strong>2 hours.</strong></p>

    <div class="details">
      <p><strong>Service:</strong> ${service.name}</p>
      <p><strong>Date:</strong> ${formatDate(appointment.appointmentDate)}</p>
      <p><strong>Time:</strong> ${timeDisplay}</p>
      ${timezoneInfo}
      <p><strong>Location:</strong> ${
        business.address ?? "Address not provided"
      }</p>
    </div>
    
    <p>If you need to make changes to your booking, you can use the links below:</p>
    
    <p>
      <a href="${rescheduleUrl}" class="button">Reschedule</a>
      <a href="${cancellationUrl}" style="margin-left: 10px; color: #6b7280; text-decoration: underline;">Cancel</a>
    </p>
    
    <p>We look forward to seeing you!</p>
  `;

  return {
    subject: `Upcoming Appointment Reminder: ${
      appointment.customerName
    } at ${formatTime(appointment.startTime)}`,
    body: baseTemplate(content),
  };
};

// Booking reminder email with timezone support
export const bookingReminder30mEmail = (payload: {
  appointment: Appointment;
  service: Service;
  business: Business;
  businessTimezone?: string;
}): EmailContent => {
  let timeDisplay = `${formatTime(
    payload.appointment.startTime
  )} - ${formatTime(payload.appointment.endTime)}`;
  let timezoneInfo = "";
  const { business, service, businessTimezone, appointment } = payload;

  // If business has timezone information, show timezone-aware times

  const viewBookingUrl = `https://biabook.app/booking/${appointment.id}`;
  const content = `
    <h2>Upcoming appointment Reminder</h2>
    <p>Dear ${appointment.customerName},</p>
    <p>This is a final reminder that your appointment  with ${
      business.name
    } is in <strong>30 minutes</strong>.</p>

    <div class="details">
      <p><strong>Service:</strong> ${service.name}</p>
      <p><strong>Date:</strong> ${formatDate(appointment.appointmentDate)}</p>
      <p><strong>Time:</strong> ${timeDisplay}</p>
      ${timezoneInfo}
      <p><strong>Location:</strong> ${
        business.address ?? "Address not provided"
      }</p>
    </div>
    
    <p><strong>Important:</strong> Your appointment is now locked and cannot be canceled or rescheduled.</p>
    
    <p>
      You can view your booking details here: 
      <a href="${viewBookingUrl}" class="button">View Booking</a>
    </p>
    
    <p>We look forward to seeing you!</p>
  `;

  return {
    subject: `Upcoming Appointment Reminder: ${
      appointment.customerName
    } at ${formatTime(appointment.startTime)}`,
    body: baseTemplate(content),
  };
};

export const business30mReminderEmail = (payload: {
  appointment: Appointment;
  service: Service;
}): EmailContent => {
  const { appointment, service } = payload;
  const viewBookingUrl = `https://biabook.app/booking/${appointment.id}`;

  const content = `
    <h2>Upcoming Appointment — 30 Minutes Away</h2>
    <p>Hi Team,</p>
    <p>This is a reminder that a customer has an appointment in <strong>30 minutes</strong>:</p>

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
      View full booking details here: 
      <a href="${viewBookingUrl}" class="button">View Booking</a>
    </p>

    <p>Make sure everything is ready for the customer’s arrival.</p>
  `;

  return {
    subject: `Appointment Reminder: ${appointment.customerName} at ${formatTime(
      appointment.startTime
    )}`,
    body: baseTemplate(content),
  };
};
