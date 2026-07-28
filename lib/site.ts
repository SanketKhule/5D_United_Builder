export const SITE_NAME = "5D United Builders";

export const SITE_TITLE =
  "5D United Builders | Construction Company in Tirunelveli";

export const SITE_DESCRIPTION =
  "5D United Builders delivers residential, commercial, renovation, and architectural construction services in Tirunelveli with quality craftsmanship and reliable project delivery.";

function normalizeUrl(value: string, addHttps = false): URL {
  const candidate =
    addHttps && !/^https?:\/\//i.test(value) ? `https://${value}` : value;
  const url = new URL(candidate);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("The website URL must use HTTP or HTTPS.");
  }

  url.pathname = "/";
  url.search = "";
  url.hash = "";

  return url;
}

export function getSiteUrl(): URL {
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (publicUrl) {
    return normalizeUrl(publicUrl);
  }

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ??
    process.env.VERCEL_URL?.trim();

  if (vercelUrl) {
    return normalizeUrl(vercelUrl, true);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required for production metadata.",
    );
  }

  const developmentHost = process.env.HOST?.trim() || "127.0.0.1";
  const developmentPort = process.env.PORT?.trim() || "3000";

  return normalizeUrl(`http://${developmentHost}:${developmentPort}`);
}

export function getTrustedSiteOrigins(): ReadonlySet<string> {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];
  const origins = new Set<string>();

  for (const candidate of candidates) {
    if (!candidate?.trim()) {
      continue;
    }

    try {
      origins.add(normalizeUrl(candidate.trim(), true).origin);
    } catch {
      // A malformed configured origin must not become trusted.
    }
  }

  return origins;
}
