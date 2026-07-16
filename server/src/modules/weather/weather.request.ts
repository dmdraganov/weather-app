import type { Request } from 'express';

const WEATHER_TYPES = ['current', 'forecast'] as const;
const SUPPORTED_LANGUAGES = ['en', 'ru'] as const;

export type WeatherType = (typeof WEATHER_TYPES)[number];
export type WeatherLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface WeatherRequest {
  type: WeatherType;
  q: string;
  days?: number;
  lang?: WeatherLanguage;
}

export class WeatherRequestError extends Error {
  public readonly status = 400;

  constructor(message: string) {
    super(message);
    this.name = 'WeatherRequestError';
  }
}

const readQueryString = (
  value: unknown,
  name: string,
  required = false
): string | undefined => {
  if (value === undefined) {
    if (required) throw new WeatherRequestError(`${name} is required`);
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new WeatherRequestError(`${name} must be a string`);
  }

  const normalizedValue = value.trim();
  if (!normalizedValue) {
    if (required) throw new WeatherRequestError(`${name} is required`);
    return undefined;
  }

  return normalizedValue;
};

export const parseWeatherRequest = (req: Request): WeatherRequest => {
  const rawType = req.params.type;
  if (
    typeof rawType !== 'string' ||
    !WEATHER_TYPES.includes(rawType as WeatherType)
  ) {
    throw new WeatherRequestError('Unsupported weather request type');
  }
  const type = rawType as WeatherType;

  const q = readQueryString(req.query.q, 'q', true)!;
  if (q.length > 200) throw new WeatherRequestError('q is too long');

  const rawDays = readQueryString(req.query.days, 'days');
  let days: number | undefined;
  if (rawDays !== undefined) {
    if (type !== 'forecast') {
      throw new WeatherRequestError('days is only supported for forecast');
    }

    days = Number(rawDays);
    if (!Number.isInteger(days) || days < 1 || days > 14) {
      throw new WeatherRequestError('days must be an integer from 1 to 14');
    }
  }

  const rawLanguage = readQueryString(req.query.lang, 'lang');
  if (
    rawLanguage !== undefined &&
    !SUPPORTED_LANGUAGES.includes(rawLanguage as WeatherLanguage)
  ) {
    throw new WeatherRequestError('Unsupported language');
  }

  return {
    type,
    q,
    days,
    lang: rawLanguage as WeatherLanguage | undefined,
  };
};
