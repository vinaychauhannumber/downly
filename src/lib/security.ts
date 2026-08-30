import { sanitizeFileName } from './utils';

// In-memory sliding window rate limiter
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Clean up expired rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of ipMap.entries()) {
    if (now > record.resetAt) {
      ipMap.delete(key);
    }
  }
}, 60000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Limit requests per IP within a time window
 * @param ip Client IP
 * @param limit Max requests allowed in the window
 * @param windowMs Time window in milliseconds (default 60s)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 20,
  windowMs: number = 60000
): RateLimitResult {
  const key = ip || 'anonymous';
  const now = Date.now();
  const record = ipMap.get(key);

  if (!record || now > record.resetAt) {
    ipMap.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.max(1, Math.ceil((record.resetAt - now) / 1000)),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetInSeconds: Math.max(1, Math.ceil((record.resetAt - now) / 1000)),
  };
}

/**
 * Validate URL against SSRF attempts (internal IP ranges, private hostnames, loopbacks)
 */
export function isSafeUrl(rawUrl: string): { safe: boolean; reason?: string } {
  try {
    const parsed = new URL(rawUrl);

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { safe: false, reason: 'Invalid protocol' };
    }

    const hostname = parsed.hostname.toLowerCase();

    // Check loopback & internal hostnames
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '::1'
    ) {
      return { safe: false, reason: 'Internal or loopback addresses are not permitted' };
    }

    // Check private IPv4 ranges
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = hostname.match(ipv4Regex);
    if (match) {
      const [, o1, o2] = match.map(Number);
      if (
        o1 === 10 || // 10.0.0.0/8
        o1 === 127 || // 127.0.0.0/8
        (o1 === 172 && o2 >= 16 && o2 <= 31) || // 172.16.0.0/12
        (o1 === 192 && o2 === 168) || // 192.168.0.0/16
        (o1 === 169 && o2 === 254) // 169.254.0.0/16 Link-local
      ) {
        return { safe: false, reason: 'Private IP addresses are not permitted' };
      }
    }

    return { safe: true };
  } catch {
    return { safe: false, reason: 'Malformed URL' };
  }
}

/**
 * Generate a safe and sanitized output filename
 */
export function createSafeFileName(
  title: string,
  quality: string,
  extension: 'mp4' | 'mp3'
): string {
  const cleanTitle = sanitizeFileName(title) || 'media';
  const cleanQuality = sanitizeFileName(quality);
  return `${cleanTitle}_${cleanQuality}.${extension}`;
}
