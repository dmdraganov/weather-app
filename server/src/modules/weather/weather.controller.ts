import { Request, Response } from 'express';
import { WeatherService, WeatherApiError } from './weather.service.js';

export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {
    this.getWeather = this.getWeather.bind(this);
  }

  public async getWeather(req: Request, res: Response): Promise<void> {
    try {
      const type = req.params.type as string;
      const q = req.query.q as string | undefined;
      const days = req.query.days as string | undefined;
      const lang = req.query.lang as string | undefined;

      const data = await this.weatherService.getWeatherData(type, q, days, lang);

      res.json(data);
    } catch (error: unknown) {
      if (error instanceof WeatherApiError) {
        res.status(error.status).json(error.data);
        return;
      }

      const message =
        error instanceof Error ? error.message : 'Internal Server Error';
      console.error('Weather API Proxy Error:', error);
      res.status(500).json({ error: message });
    }
  }
}
