import { createHash } from "node:crypto";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map<string, number[]>();

export function contactRateLimit(identifier: string, now = Date.now()) {
  const key = createHash("sha256").update(identifier).digest("hex");
  const earliest = now - WINDOW_MS;
  const recent = (attempts.get(key) ?? []).filter((timestamp) => timestamp > earliest);

  if (recent.length >= MAX_REQUESTS) {
    attempts.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((recent[0] + WINDOW_MS - now) / 1000)) };
  }

  recent.push(now);
  attempts.set(key, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetContactRateLimitForTests() {
  attempts.clear();
}
