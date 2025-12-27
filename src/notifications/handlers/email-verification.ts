import { baseTemplate } from ".";

// Email verification confirmation email
export const emailVerificationEmail = (
  name: string,
  email: string,
  verificationUrl: string
) => {
  const content = `
    <h2>Confirm Your Email Address</h2>
    <p>Hi ${name || "there"},</p>
    <p>Welcome to BiaBook! To complete your registration and start using your account, please confirm your email address by clicking the button below.</p>
    
    <p>
      <a href="${verificationUrl}" class="button">Confirm Email Address</a>
    </p>
    
    <p>Or copy and paste this link in your browser:</p>
    <p style="word-break: break-all; color: #6b7280; font-size: 14px;">${verificationUrl}</p>
    
    <p>This link will expire in 24 hours for security reasons.</p>
    
    <p>If you didn't create an account with BiaBook, you can safely ignore this email.</p>
    
    <p>Best regards,<br>The BiaBook Team</p>
  `;

  return baseTemplate(content);
};
