import { sendAdminEmail, sendThankYouEmail } from "@/lib/email";

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  mobile: string;
  message: string;
}

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function validate(body: unknown): { valid: boolean; errors: Record<string, string>; data?: ContactBody } {
  const errors: Record<string, string> = {};
  const contact: Record<string, unknown> = {};

  if (!body || typeof body !== "object") {
    return { valid: false, errors: { _form: "Invalid request body." } };
  }

  const data = body as Record<string, unknown>;

  const nameRaw = data.name;
  const emailRaw = data.email;
  const subjectRaw = data.subject;
  const mobileRaw = data.mobile;
  const messageRaw = data.message;

  if (typeof nameRaw === "string" && nameRaw.trim().length >= 2) {
    contact.name = sanitize(nameRaw.trim());
  } else {
    errors.name = "Name must be at least 2 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof emailRaw === "string" && emailRegex.test(emailRaw.trim())) {
    contact.email = sanitize(emailRaw.trim());
  } else {
    errors.email = "Please enter a valid email address.";
  }

  if (typeof subjectRaw === "string" && subjectRaw.trim().length >= 2) {
    contact.subject = sanitize(subjectRaw.trim());
  } else {
    errors.subject = "Subject must be at least 2 characters.";
  }

  const mobileRegex = /^\+?[\d\s\-().]{7,20}$/;
  if (typeof mobileRaw === "string" && mobileRegex.test(mobileRaw.trim())) {
    contact.mobile = sanitize(mobileRaw.trim());
  } else {
    errors.mobile = "Please enter a valid mobile number.";
  }

  if (typeof messageRaw === "string" && messageRaw.trim().length >= 10) {
    contact.message = sanitize(messageRaw.trim());
  } else {
    errors.message = "Message must be at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    data: contact as unknown as ContactBody,
  };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = validate(body);

    if (!result.valid || !result.data) {
      return Response.json(
        { success: false, message: "Validation failed. Please check your inputs.", errors: result.errors },
        { status: 400 }
      );
    }

    const { name, email, subject, mobile, message } = result.data;

    await Promise.all([
      sendAdminEmail({ name, email, subject, mobile, message }),
      sendThankYouEmail({ name, email, subject, mobile, message }),
    ]);

    return Response.json(
      { success: true, message: "Your message has been sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { success: false, message: "Unable to send your message. Please try again." },
      { status: 500 }
    );
  }
}
