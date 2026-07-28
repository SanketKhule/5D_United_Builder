import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const CONTACT_LIMIT = 5;
const CONTACT_WINDOW = "10 m";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

const contactRateLimit =
  redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({ url: redisUrl, token: redisToken }),
        limiter: Ratelimit.slidingWindow(CONTACT_LIMIT, CONTACT_WINDOW),
        analytics: false,
        prefix: "5d-united-builders:contact",
      })
    : null;

export class RateLimitUnavailableError extends Error {
  constructor() {
    super("Distributed rate limiting is not configured.");
    this.name = "RateLimitUnavailableError";
  }
}

function anonymize(value: string): string {
  if (!redisToken) {
    if (process.env.NODE_ENV === "production") {
      throw new RateLimitUnavailableError();
    }

    return "development";
  }

  return createHmac("sha256", redisToken).update(value).digest("hex");
}

function getClientIp(request: Request): string {
  const forwardedIp = request.headers
    .get("x-forwarded-for")
    ?.split(",", 1)[0]
    ?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  if (forwardedIp && isIP(forwardedIp)) {
    return forwardedIp;
  }

  if (realIp && isIP(realIp)) {
    return realIp;
  }

  return "unknown";
}

export interface ContactRateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

async function checkIdentifier(
  identifier: string,
): Promise<ContactRateLimitResult> {
  if (!contactRateLimit) {
    if (process.env.NODE_ENV === "production") {
      throw new RateLimitUnavailableError();
    }

    return {
      success: true,
      limit: CONTACT_LIMIT,
      remaining: CONTACT_LIMIT,
      reset: Date.now(),
    };
  }

  const result = await contactRateLimit.limit(identifier);

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}

export function checkContactIpLimit(
  request: Request,
): Promise<ContactRateLimitResult> {
  return checkIdentifier(`ip:${anonymize(getClientIp(request))}`);
}

export function checkContactEmailLimit(
  email: string,
): Promise<ContactRateLimitResult> {
  return checkIdentifier(`email:${anonymize(email.trim().toLowerCase())}`);
}
