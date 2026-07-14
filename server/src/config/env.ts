const readPositiveInteger = (name: string, fallback: number): number => {
  const rawValue = process.env[name];
  if (!rawValue) return fallback;

  const value = Number(rawValue);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }

  return value;
};

const requireEnvironmentVariable = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured on the server`);
  return value;
};

const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const env = {
  port: readPositiveInteger('PORT', 3000),
  weatherApiKey: requireEnvironmentVariable('WEATHER_API_KEY'),
  weatherRequestTimeoutMs: readPositiveInteger(
    'WEATHER_REQUEST_TIMEOUT_MS',
    5_000
  ),
  weatherCacheTtlMs: readPositiveInteger('WEATHER_CACHE_TTL_MS', 60_000),
  weatherCacheMaxEntries: readPositiveInteger('WEATHER_CACHE_MAX_ENTRIES', 100),
  rateLimitWindowMs: readPositiveInteger('RATE_LIMIT_WINDOW_MS', 60_000),
  rateLimitMaxRequests: readPositiveInteger('RATE_LIMIT_MAX_REQUESTS', 60),
  corsOrigins,
} as const;
