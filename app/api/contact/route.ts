import { sendAdminEmail, sendThankYouEmail } from "@/lib/email";
import {
  contactSchema,
  formatContactErrors,
} from "@/lib/contact-validation";
import {
  checkContactEmailLimit,
  checkContactIpLimit,
  RateLimitUnavailableError,
  type ContactRateLimitResult,
} from "@/lib/rate-limit";
import { getTrustedSiteOrigins } from "@/lib/site";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 12_000;
const JSON_CONTENT_TYPE = "application/json";

interface JsonErrorBody {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

function jsonResponse(
  body: JsonErrorBody | { success: true; message: string },
  status: number,
  headers?: HeadersInit,
): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

function isTrustedOrigin(request: Request): boolean {
  const originHeader = request.headers.get("origin");

  if (!originHeader) {
    return false;
  }

  try {
    const requestOrigin = new URL(originHeader).origin;
    const trustedOrigins = getTrustedSiteOrigins();

    if (trustedOrigins.has(requestOrigin)) {
      return true;
    }

    return (
      process.env.NODE_ENV !== "production" &&
      requestOrigin === new URL(request.url).origin
    );
  } catch {
    return false;
  }
}

function rateLimitHeaders(result: ContactRateLimitResult): HeadersInit {
  return {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(Math.max(0, result.remaining)),
    "RateLimit-Reset": String(Math.ceil(result.reset / 1000)),
  };
}

function rateLimitedResponse(result: ContactRateLimitResult): Response {
  const retryAfter = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));

  return jsonResponse(
    {
      success: false,
      message: "Too many requests. Please wait before trying again.",
    },
    429,
    {
      ...rateLimitHeaders(result),
      "Retry-After": String(retryAfter),
    },
  );
}

async function readBoundedJson(request: Request): Promise<unknown> {
  const contentLengthHeader = request.headers.get("content-length");

  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);

    if (
      !Number.isSafeInteger(contentLength) ||
      contentLength < 0 ||
      contentLength > MAX_REQUEST_BYTES
    ) {
      throw new RangeError("Request body is too large.");
    }
  }

  if (!request.body) {
    throw new SyntaxError("Request body is missing.");
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalBytes += value.byteLength;

      if (totalBytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new RangeError("Request body is too large.");
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const text = new TextDecoder("utf-8", { fatal: true }).decode(body);
  return JSON.parse(text) as unknown;
}

function logDeliveryFailure(error: unknown): void {
  if (process.env.NODE_ENV === "development") {
    console.error("Contact email delivery failed:", error);
    return;
  }

  console.error("Contact email delivery failed.");
}

export async function POST(request: Request): Promise<Response> {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  const mediaType = contentType.split(";", 1)[0]?.trim();

  if (mediaType !== JSON_CONTENT_TYPE) {
    return jsonResponse(
      {
        success: false,
        message: "The request must use JSON.",
      },
      415,
    );
  }

  if (!isTrustedOrigin(request)) {
    return jsonResponse(
      {
        success: false,
        message: "The request origin is not allowed.",
      },
      403,
      { Vary: "Origin" },
    );
  }

  try {
    const ipLimit = await checkContactIpLimit(request);

    if (!ipLimit.success) {
      return rateLimitedResponse(ipLimit);
    }

    let body: unknown;

    try {
      body = await readBoundedJson(request);
    } catch (error) {
      if (error instanceof RangeError) {
        return jsonResponse(
          {
            success: false,
            message: "The request is too large.",
          },
          413,
          rateLimitHeaders(ipLimit),
        );
      }

      return jsonResponse(
        {
          success: false,
          message: "The request body is not valid JSON.",
        },
        400,
        rateLimitHeaders(ipLimit),
      );
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return jsonResponse(
        {
          success: false,
          message: "Validation failed. Please check your inputs.",
          errors: formatContactErrors(result.error),
        },
        400,
        rateLimitHeaders(ipLimit),
      );
    }

    const { name, email, subject, mobile, message, website } = result.data;

    if (website) {
      return jsonResponse(
        {
          success: true,
          message: "Your message has been sent successfully.",
        },
        200,
        rateLimitHeaders(ipLimit),
      );
    }

    const emailLimit = await checkContactEmailLimit(email);

    if (!emailLimit.success) {
      return rateLimitedResponse(emailLimit);
    }

    try {
      await Promise.all([
        sendAdminEmail({ name, email, subject, mobile, message }),
        sendThankYouEmail({ name, email, subject, mobile, message }),
      ]);
    } catch (error) {
      logDeliveryFailure(error);

      return jsonResponse(
        {
          success: false,
          message: "Unable to send your message. Please try again.",
        },
        502,
        rateLimitHeaders(emailLimit),
      );
    }

    return jsonResponse(
      {
        success: true,
        message: "Your message has been sent successfully.",
      },
      200,
      rateLimitHeaders(emailLimit),
    );
  } catch (error) {
    if (error instanceof RateLimitUnavailableError) {
      console.error("Contact rate limiting is unavailable.");
    } else if (process.env.NODE_ENV === "development") {
      console.error("Contact request failed:", error);
    } else {
      console.error("Contact request failed.");
    }

    return jsonResponse(
      {
        success: false,
        message: "The contact service is temporarily unavailable.",
      },
      503,
    );
  }
}
