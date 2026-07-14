import assert from 'node:assert/strict';
import test from 'node:test';
import type { Request } from 'express';
import {
  parseWeatherRequest,
  WeatherRequestError,
} from '../src/modules/weather/weather.request.js';

const request = (type: string, query: Record<string, unknown>): Request => {
  return { params: { type }, query } as unknown as Request;
};

test('parses an allowed forecast request', () => {
  assert.deepEqual(
    parseWeatherRequest(
      request('forecast', { q: '55.75, 37.61', days: '7', lang: 'ru' })
    ),
    {
      type: 'forecast',
      q: '55.75, 37.61',
      days: 7,
      lang: 'ru',
    }
  );
});

test('rejects unsupported request types', () => {
  assert.throws(
    () => parseWeatherRequest(request('search', { q: 'Moscow' })),
    WeatherRequestError
  );
});

test('rejects invalid query limits', () => {
  assert.throws(
    () =>
      parseWeatherRequest(
        request('forecast', { q: 'Moscow', days: '30', lang: 'en' })
      ),
    /days must be an integer from 1 to 14/
  );
});
