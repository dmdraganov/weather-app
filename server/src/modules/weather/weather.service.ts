export class WeatherApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly data: unknown
  ) {
    super('Weather API Error');
    this.name = 'WeatherApiError';
  }
}

export class WeatherService {
  private readonly baseUrl = 'http://api.weatherapi.com/v1';

  constructor(private readonly apiKey: string) {
    if (!this.apiKey) {
      throw new Error('WEATHER_API_KEY is not configured on the server');
    }
  }

  public async getWeatherData(
    type: string,
    q?: string,
    days?: string,
    lang?: string
  ): Promise<unknown> {
    const url = new URL(`${this.baseUrl}/${type}.json`);
    url.searchParams.append('key', this.apiKey);
    if (q) url.searchParams.append('q', q);
    if (days) url.searchParams.append('days', days);
    if (lang) url.searchParams.append('lang', lang);

    const response = await fetch(url.toString());
    const data: unknown = await response.json();

    if (!response.ok) {
      throw new WeatherApiError(response.status, data);
    }

    return data;
  }
}
