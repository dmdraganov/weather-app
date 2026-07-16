import assert from 'node:assert/strict';
import test from 'node:test';
import { WeatherService } from '../src/modules/weather/weather.service.js';

test('uses HTTPS and caches identical successful requests', async (context) => {
  const originalFetch = globalThis.fetch;
  const requestedUrls: string[] = [];

  globalThis.fetch = (async (input) => {
    requestedUrls.push(String(input));
    return new Response(JSON.stringify({ location: { name: 'Moscow' } }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }) as typeof fetch;

  context.after(() => {
    globalThis.fetch = originalFetch;
  });

  const service = new WeatherService('test-key', {
    requestTimeoutMs: 1_000,
    cacheTtlMs: 60_000,
    cacheMaxEntries: 10,
  });
  const weatherRequest = {
    type: 'forecast' as const,
    q: 'Moscow',
    days: 7,
    lang: 'en' as const,
  };

  const firstResponse = await service.getWeatherData(weatherRequest);
  const secondResponse = await service.getWeatherData(weatherRequest);

  assert.deepEqual(secondResponse, firstResponse);
  assert.equal(requestedUrls.length, 1);
  assert.match(requestedUrls[0], /^https:\/\/api\.weatherapi\.com\//);
});
