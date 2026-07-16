import type { WeatherRequest } from './weather.request.js';

export class WeatherApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly data: unknown
  ) {
    super('Weather API Error');
    this.name = 'WeatherApiError';
  }
}

interface WeatherServiceOptions {
  requestTimeoutMs: number;
  cacheTtlMs: number;
  cacheMaxEntries: number;
}

interface CachedWeatherResponse {
  data: unknown;
  expiresAt: number;
}

export class WeatherService {
  private readonly API_URL = 'https://api.weatherapi.com/v1';
  private readonly cache = new Map<string, CachedWeatherResponse>();
  private readonly inFlightRequests = new Map<string, Promise<unknown>>();

  constructor(
    private readonly apiKey: string,
    private readonly options: WeatherServiceOptions
  ) {}

  public async getWeatherData(request: WeatherRequest): Promise<unknown> {
    const cacheKey = JSON.stringify(request);
    const cachedResponse = this.cache.get(cacheKey);

    if (cachedResponse && cachedResponse.expiresAt > Date.now()) {
      return cachedResponse.data;
    }
    if (cachedResponse) this.cache.delete(cacheKey);

    const inFlightRequest = this.inFlightRequests.get(cacheKey);
    if (inFlightRequest) return inFlightRequest;

    const requestPromise = this.fetchWeatherData(request)
      .then((data) => {
        this.cacheResponse(cacheKey, data);
        return data;
      })
      .finally(() => {
        this.inFlightRequests.delete(cacheKey);
      });

    this.inFlightRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  private async fetchWeatherData(request: WeatherRequest): Promise<unknown> {
    const url = new URL(`${this.API_URL}/${request.type}.json`);
    url.searchParams.append('key', this.apiKey);
    url.searchParams.append('q', request.q);
    if (request.days) url.searchParams.append('days', String(request.days));
    if (request.lang) url.searchParams.append('lang', request.lang);

    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(this.options.requestTimeoutMs),
      });
      const responseText = await response.text();
      let data: unknown;

      try {
        data = JSON.parse(responseText) as unknown;
      } catch {
        throw new WeatherApiError(502, {
          error: 'Weather provider returned an invalid response',
        });
      }

      if (!response.ok) {
        throw new WeatherApiError(response.status, data);
      }

      return data;
    } catch (error: unknown) {
      if (error instanceof WeatherApiError) throw error;

      const isTimeout =
        error instanceof Error &&
        (error.name === 'TimeoutError' || error.name === 'AbortError');

      throw new WeatherApiError(isTimeout ? 504 : 502, {
        error: isTimeout
          ? 'Weather provider request timed out'
          : 'Weather provider is unavailable',
      });
    }
  }

  private cacheResponse(cacheKey: string, data: unknown): void {
    if (this.cache.size >= this.options.cacheMaxEntries) {
      const oldestKey = this.cache.keys().next().value as string | undefined;
      if (oldestKey) this.cache.delete(oldestKey);
    }

    this.cache.set(cacheKey, {
      data,
      expiresAt: Date.now() + this.options.cacheTtlMs,
    });
  }
}
