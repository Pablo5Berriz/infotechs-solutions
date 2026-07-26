import { createHash } from "node:crypto";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_IDENTITIES = 10_000;
const SWEEP_INTERVAL_MS = 60_000;
const attempts = new Map<string, number[]>();
let lastSweepAt = 0;

function purgeExpiredAttempts(now: number) {
  if (now - lastSweepAt < SWEEP_INTERVAL_MS) return;
  lastSweepAt = now;
  const earliest = now - WINDOW_MS;
  for (const [key, timestamps] of attempts) {
    const recent = timestamps.filter((timestamp) => timestamp > earliest);
    if (recent.length === 0) attempts.delete(key);
    else if (recent.length !== timestamps.length) attempts.set(key, recent);
  }
}

function enforceStorageLimit() {
  while (attempts.size >= MAX_IDENTITIES) {
    const oldestKey = attempts.keys().next().value;
    if (oldestKey === undefined) return;
    attempts.delete(oldestKey);
  }
}

export function contactRateLimit(identifier: string, now = Date.now()) {
  purgeExpiredAttempts(now);
  const key = createHash("sha256").update(identifier).digest("hex");
  const earliest = now - WINDOW_MS;
  const recent = (attempts.get(key) ?? []).filter((timestamp) => timestamp > earliest);

  if (recent.length >= MAX_REQUESTS) {
    attempts.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((recent[0] + WINDOW_MS - now) / 1000)) };
  }

  recent.push(now);
  if (!attempts.has(key)) enforceStorageLimit();
  attempts.set(key, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetContactRateLimitForTests() {
  attempts.clear();
  lastSweepAt = 0;
}

export function contactRateLimitEntryCountForTests() {
  return attempts.size;
}
