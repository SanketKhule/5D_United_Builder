import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function adminEmailTemplate({
  name,
  email,
  subject,
  mobile,
  message,
  submittedAt,
}: {
  name: string;
  email: string;
  subject: string;
  mobile: string;
  message: string;
  submittedAt: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#1e293b,#334155);padding:36px 40px;text-align:center;">
              <div style="width:48px;height:48px;background:#3b82f6;border-radius:12px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">New Contact Message</h1>
              <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">${submittedAt}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:4px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="100" style="color:#64748b;font-size:13px;font-weight:500;">Name</td>
                              <td style="color:#1e293b;font-size:14px;font-weight:600;">${name}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="100" style="color:#64748b;font-size:13px;font-weight:500;">Email</td>
                              <td style="color:#1e293b;font-size:14px;"><a href="mailto:${email}" style="color:#3b82f6;text-decoration:none;font-weight:500;">${email}</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="100" style="color:#64748b;font-size:13px;font-weight:500;">Subject</td>
                              <td style="color:#1e293b;font-size:14px;font-weight:600;">${subject}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="100" style="color:#64748b;font-size:13px;font-weight:500;">Mobile</td>
                              <td style="color:#1e293b;font-size:14px;"><a href="tel:${mobile}" style="color:#3b82f6;text-decoration:none;font-weight:500;">${mobile}</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:24px;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;">
                      <p style="margin:0 0 8px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;">Message</p>
                      <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.7;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:16px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">This message was sent from the contact form on your website.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function thankYouEmailTemplate({
  name,
  subject,
  mobile,
  message,
  companyName,
}: {
  name: string;
  subject: string;
  mobile: string;
  message: string;
  companyName: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#1e293b,#334155);padding:36px 40px;text-align:center;">
              <div style="width:48px;height:48px;background:#22c55e;border-radius:12px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Thank You for Contacting Us</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 12px;color:#334155;font-size:15px;line-height:1.7;">Hello <strong>${name}</strong>,</p>
              <p style="margin:0 0 12px;color:#475569;font-size:15px;line-height:1.7;">Thank you for reaching out to us. We have successfully received your message regarding &ldquo;<strong style="color:#1e293b;">${subject}</strong>&rdquo;.</p>
              <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.7;">Our team will review your enquiry and get back to you as soon as possible.</p>

              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:28px;">
                <p style="margin:0 0 12px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Submitted Details</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="110" style="padding:5px 0;color:#64748b;font-size:13px;">Mobile Number</td>
                    <td style="padding:5px 0;color:#1e293b;font-size:14px;font-weight:500;">${mobile}</td>
                  </tr>
                  <tr>
                    <td width="110" style="padding:5px 0;color:#64748b;font-size:13px;vertical-align:top;">Message</td>
                    <td style="padding:5px 0;color:#1e293b;font-size:14px;font-weight:500;line-height:1.6;">${message}</td>
                  </tr>
                </table>
              </div>

              <p style="margin:0 0 4px;color:#334155;font-size:15px;line-height:1.7;">Best regards,</p>
              <p style="margin:0;color:#1e293b;font-size:16px;font-weight:700;">${companyName}</p>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:16px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">This is an automated acknowledgement. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendAdminEmail({
  name,
  email,
  subject,
  mobile,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  mobile: string;
  message: string;
}) {
  const submittedAt = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  await transporter.sendMail({
    from: `"${process.env.COMPANY_NAME}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Message: ${subject}`,
    html: adminEmailTemplate({ name, email, subject, mobile, message, submittedAt }),
  });
}

export async function sendThankYouEmail({
  name,
  email,
  subject,
  mobile,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  mobile: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"${process.env.COMPANY_NAME}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Thank You for Contacting Us",
    html: thankYouEmailTemplate({ name, subject, mobile, message, companyName: process.env.COMPANY_NAME ?? "" }),
  });
}
