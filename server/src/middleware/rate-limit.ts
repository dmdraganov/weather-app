import type { RequestHandler } from 'express';

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  maxTrackedClients?: number;
}

interface ClientWindow {
  count: number;
  resetAt: number;
}

export const createRateLimit = ({
  windowMs,
  maxRequests,
  maxTrackedClients = 10_000,
}: RateLimitOptions): RequestHandler => {
  const clients = new Map<string, ClientWindow>();

  return (req, res, next) => {
    const now = Date.now();

    if (clients.size >= maxTrackedClients) {
      for (const [client, window] of clients) {
        if (window.resetAt <= now) clients.delete(client);
      }

      if (clients.size >= maxTrackedClients) {
        const oldestClient = clients.keys().next().value as string | undefined;
        if (oldestClient) clients.delete(oldestClient);
      }
    }

    const client = req.ip ?? req.socket.remoteAddress ?? 'unknown';
    const existingWindow = clients.get(client);
    const clientWindow =
      !existingWindow || existingWindow.resetAt <= now
        ? { count: 0, resetAt: now + windowMs }
        : existingWindow;

    clients.set(client, clientWindow);

    const remaining = Math.max(0, maxRequests - clientWindow.count - 1);
    res.setHeader('RateLimit-Limit', maxRequests);
    res.setHeader('RateLimit-Remaining', remaining);
    res.setHeader('RateLimit-Reset', Math.ceil(clientWindow.resetAt / 1000));

    if (clientWindow.count >= maxRequests) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((clientWindow.resetAt - now) / 1000)
      );
      res.setHeader('Retry-After', retryAfterSeconds);
      res.status(429).json({ error: 'Too many requests' });
      return;
    }

    clientWindow.count += 1;
    next();
  };
};
