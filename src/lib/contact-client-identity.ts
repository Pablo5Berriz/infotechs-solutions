import { isIP } from "node:net";

export const CONTACT_CLIENT_IP_HEADER = "x-infotechs-client-ip";
export const CONTACT_PROXY_MODE = "trusted";
const UNTRUSTED_FALLBACK = "contact-client:untrusted-proxy";

export function normalizeContactClientIp(value?: string | null) {
  if (!value || /[\r\n,]/.test(value)) return null;

  const candidate = value.trim();
  const version = isIP(candidate);
  if (version === 4) return candidate.split(".").map(Number).join(".");
  if (version !== 6) return null;

  try {
    return new URL(`http://[${candidate}]/`).hostname.slice(1, -1).toLowerCase();
  } catch {
    return null;
  }
}

export function resolveContactClientIdentity(request: Request) {
  if (process.env.CONTACT_TRUSTED_PROXY_MODE !== CONTACT_PROXY_MODE) {
    return UNTRUSTED_FALLBACK;
  }

  const clientIp = normalizeContactClientIp(request.headers.get(CONTACT_CLIENT_IP_HEADER));
  return clientIp ? `contact-client:${clientIp}` : UNTRUSTED_FALLBACK;
}
