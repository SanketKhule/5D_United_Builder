import nodemailer from "nodemailer";
import { escape } from "html-escaper";
import { z } from "zod";

const emailConfigSchema = z.object({
  SMTP_HOST: z.string().trim().min(1).max(253),
  SMTP_PORT: z.coerce.number().int().min(1).max(65_535),
  SMTP_SECURE: z.enum(["true", "false"]).default("false"),
  SMTP_USER: z.email().max(254),
  SMTP_PASS: z.string().min(1).max(1_024),
  ADMIN_EMAIL: z.email().max(254),
  COMPANY_NAME: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .refine((value) => !/[\r\n]/.test(value)),
});

type EmailConfig = z.infer<typeof emailConfigSchema>;

let cachedConfig: EmailConfig | null = null;
let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null =
  null;

function getEmailConfig(): EmailConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const result = emailConfigSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error("Email service is not configured.");
  }

  cachedConfig = result.data;
  return cachedConfig;
}

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const config = getEmailConfig();

  cachedTransporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE === "true",
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
    disableFileAccess: true,
    disableUrlAccess: true,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return cachedTransporter;
}

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
  const safeName = escape(name);
  const safeEmail = escape(email);
  const safeSubject = escape(subject);
  const safeMobile = escape(mobile);
  const safeMessage = escape(message);
  const safeSubmittedAt = escape(submittedAt);

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
              <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">${safeSubmittedAt}</p>
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
                              <td style="color:#1e293b;font-size:14px;font-weight:600;">${safeName}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="100" style="color:#64748b;font-size:13px;font-weight:500;">Email</td>
                              <td style="color:#1e293b;font-size:14px;"><a href="mailto:${safeEmail}" style="color:#3b82f6;text-decoration:none;font-weight:500;">${safeEmail}</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="100" style="color:#64748b;font-size:13px;font-weight:500;">Subject</td>
                              <td style="color:#1e293b;font-size:14px;font-weight:600;">${safeSubject}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:10px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="100" style="color:#64748b;font-size:13px;font-weight:500;">Mobile</td>
                              <td style="color:#1e293b;font-size:14px;"><a href="tel:${safeMobile}" style="color:#3b82f6;text-decoration:none;font-weight:500;">${safeMobile}</a></td>
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
                      <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.7;">${safeMessage}</p>
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
  const safeName = escape(name);
  const safeSubject = escape(subject);
  const safeMobile = escape(mobile);
  const safeMessage = escape(message);
  const safeCompanyName = escape(companyName);

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
              <p style="margin:0 0 12px;color:#334155;font-size:15px;line-height:1.7;">Hello <strong>${safeName}</strong>,</p>
              <p style="margin:0 0 12px;color:#475569;font-size:15px;line-height:1.7;">Thank you for reaching out to us. We have successfully received your message regarding &ldquo;<strong style="color:#1e293b;">${safeSubject}</strong>&rdquo;.</p>
              <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.7;">Our team will review your enquiry and get back to you as soon as possible.</p>

              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:28px;">
                <p style="margin:0 0 12px;color:#64748b;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Submitted Details</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="110" style="padding:5px 0;color:#64748b;font-size:13px;">Mobile Number</td>
                    <td style="padding:5px 0;color:#1e293b;font-size:14px;font-weight:500;">${safeMobile}</td>
                  </tr>
                  <tr>
                    <td width="110" style="padding:5px 0;color:#64748b;font-size:13px;vertical-align:top;">Message</td>
                    <td style="padding:5px 0;color:#1e293b;font-size:14px;font-weight:500;line-height:1.6;">${safeMessage}</td>
                  </tr>
                </table>
              </div>

              <p style="margin:0 0 4px;color:#334155;font-size:15px;line-height:1.7;">Best regards,</p>
              <p style="margin:0;color:#1e293b;font-size:16px;font-weight:700;">${safeCompanyName}</p>
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
  const config = getEmailConfig();
  const transporter = getTransporter();
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
    from: {
      name: config.COMPANY_NAME,
      address: config.SMTP_USER,
    },
    replyTo: {
      name,
      address: email,
    },
    to: config.ADMIN_EMAIL,
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
  const config = getEmailConfig();
  const transporter = getTransporter();

  await transporter.sendMail({
    from: {
      name: config.COMPANY_NAME,
      address: config.SMTP_USER,
    },
    to: email,
    subject: "Thank You for Contacting Us",
    html: thankYouEmailTemplate({
      name,
      subject,
      mobile,
      message,
      companyName: config.COMPANY_NAME,
    }),
  });
}
