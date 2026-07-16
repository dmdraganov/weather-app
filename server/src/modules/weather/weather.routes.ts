import { Router } from 'express';
import { WeatherController } from './weather.controller.js';

export class WeatherRouter {
  public readonly router: Router;

  constructor(private readonly weatherController: WeatherController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/:type', this.weatherController.getWeather);
  }
}
