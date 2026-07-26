import { beforeEach, describe, expect, it } from "vitest";
import {
  contactRateLimit,
  contactRateLimitEntryCountForTests,
  resetContactRateLimitForTests,
} from "@/lib/contact-rate-limit";

describe("contactRateLimit", () => {
  beforeEach(resetContactRateLimitForTests);

  it("refuse la sixième requête pendant dix minutes", () => {
    const now = 1_000_000;
    for (let index = 0; index < 5; index += 1) {
      expect(contactRateLimit("client-a", now + index).allowed).toBe(true);
    }
    expect(contactRateLimit("client-a", now + 5)).toEqual({
      allowed: false,
      retryAfterSeconds: 600,
    });
  });

  it("isole les identités sans stocker leur valeur brute", () => {
    contactRateLimit("203.0.113.10", 1_000);
    expect(contactRateLimit("203.0.113.11", 1_000).allowed).toBe(true);
    expect(contactRateLimitEntryCountForTests()).toBe(2);
  });

  it("purge les entrées expirées", () => {
    contactRateLimit("ancien-client", 1_000);
    expect(contactRateLimitEntryCountForTests()).toBe(1);
    contactRateLimit("nouveau-client", 1_000 + 10 * 60 * 1_000 + 1);
    expect(contactRateLimitEntryCountForTests()).toBe(1);
  });

  it("borne le nombre d’identités conservées en mémoire", () => {
    for (let index = 0; index <= 10_000; index += 1) {
      contactRateLimit(`client-${index}`, 1_000);
    }
    expect(contactRateLimitEntryCountForTests()).toBe(10_000);
  });
});
