import type { Request, Response } from 'express';
import { WeatherService, WeatherApiError } from './weather.service.js';
import { parseWeatherRequest, WeatherRequestError } from './weather.request.js';

export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {
    this.getWeather = this.getWeather.bind(this);
  }

  public async getWeather(req: Request, res: Response): Promise<void> {
    try {
      const weatherRequest = parseWeatherRequest(req);
      const data = await this.weatherService.getWeatherData(weatherRequest);

      res.json(data);
    } catch (error: unknown) {
      if (error instanceof WeatherRequestError) {
        res.status(error.status).json({ error: error.message });
        return;
      }

      if (error instanceof WeatherApiError) {
        res.status(error.status).json(error.data);
        return;
      }

      console.error('Weather API Proxy Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
