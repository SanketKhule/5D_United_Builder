import { z } from "zod";

const singleLineText = (label: string, minimum: number, maximum: number) =>
  z
    .string()
    .trim()
    .min(minimum, `${label} must be at least ${minimum} characters.`)
    .max(maximum, `${label} must be no more than ${maximum} characters.`)
    .refine(
      (value) => !/[\u0000-\u001F\u007F]/.test(value),
      `${label} contains unsupported characters.`,
    );

export const contactSchema = z.strictObject({
  name: singleLineText("Name", 2, 80),
  email: z
    .string()
    .trim()
    .max(254, "Email address is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  subject: singleLineText("Subject", 2, 120),
  mobile: z
    .string()
    .trim()
    .min(7, "Please enter a valid mobile number.")
    .max(20, "Please enter a valid mobile number.")
    .regex(/^\+?[\d\s\-().]+$/, "Please enter a valid mobile number."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2_000, "Message must be no more than 2000 characters.")
    .refine(
      (value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value),
      "Message contains unsupported characters.",
    ),
  website: z.string().trim().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function formatContactErrors(
  error: z.ZodError<ContactInput>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    const key = typeof field === "string" ? field : "_form";

    if (!(key in errors)) {
      errors[key] = issue.message;
    }
  }

  return errors;
}
