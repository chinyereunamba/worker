import * as nodemailer from "nodemailer";

// Types for email service
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create a transporter with environment variables
const createTransporter = () => {
  // Check if we have email configuration
  if (
    !process.env.EMAIL_SERVER_HOST ||
    !process.env.EMAIL_SERVER_PORT ||
    !process.env.EMAIL_SERVER_USER ||
    !process.env.EMAIL_SERVER_PASSWORD
  ) {
    console.warn("Email configuration is missing. Emails will not be sent.");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT),
    secure: parseInt(process.env.EMAIL_SERVER_PORT) === 465,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
};

// Email service class
export class EmailService {
  private transporter: nodemailer.Transporter | null;

  constructor() {
    this.transporter = createTransporter();
  }

  // Send an email
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      if (!this.transporter) {
        console.log("Email transporter not configured - skipping email");

        return false;
      }

      const from = process.env.EMAIL_FROM ?? "no-reply@biabook.com";
      console.log("Sending email:", {
        from,
        to: options.to,
        subject: options.subject,
      });

      await this.transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text ?? options.html.replace(/<[^>]*>/g, "") ?? "", // Strip HTML tags for plain text
      });

      console.log("Email sent successfully to:", options.to);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Email send error:", errorMessage);

      return false;
    }
  }
}

// Create a singleton instance
export const emailService = new EmailService();
