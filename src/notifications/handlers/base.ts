export const emailHeader = () => `
  <div class="header" style="
    background-color: #7c3aed;
    padding: 24px 0;
    text-align: center;
  ">
    <img src="https://biabook.app/logo.png" alt="BiaBook Logo" width="120" style="margin-bottom: 8px;" />
    <h1 style="
      color: #ffffff;
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 0.5px;
    ">BiaBook</h1>
  </div>
`;

export const emailFooter = () => `
  <div class="footer" style="
    background-color: #f9fafb;
    padding: 20px;
    text-align: center;
    font-size: 13px;
    color: #6b7280;
    line-height: 1.6;
  ">
    <p style="margin: 0;">© ${new Date().getFullYear()} <strong>BiaBook</strong>. All rights reserved.</p>
    <p style="margin: 8px 0 0 0;">You’re receiving this email because you booked or registered on BiaBook.</p>
    <p style="margin-top: 8px;">
      <a href="https://biabook.app/privacy" style="color: #7c3aed; text-decoration: none;">Privacy Policy</a> •
      <a href="https://biabook.app/terms" style="color: #7c3aed; text-decoration: none;">Terms of Service</a>
    </p>
  </div>
`;



// Base template for all emails
const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BiaBook</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    }
    .content {
      padding: 24px;
    }
    .button {
      display: inline-block;
      background-color: #7c3aed;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 500;
      margin-top: 20px;
    }
    .details {
      background-color: #f9fafb;
      padding: 16px;
      border-radius: 6px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    ${emailHeader()}
    <div class="content">
      ${content}
    </div>
    ${emailFooter()}
  </div>
</body>
</html>
`;


export {baseTemplate}