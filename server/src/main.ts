import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { WeatherService } from './modules/weather/weather.service.js';
import { WeatherController } from './modules/weather/weather.controller.js';
import { WeatherRouter } from './modules/weather/weather.routes.js';

const app = express();

app.use(cors());

const apiKey = process.env.WEATHER_API_KEY || '';
const weatherService = new WeatherService(apiKey);
const weatherController = new WeatherController(weatherService);
const weatherRouter = new WeatherRouter(weatherController);

app.use('/api/weather', weatherRouter.router);

app.listen(process.env.PORT || '3000', () => {
  console.log(`Server is running on port ${process.env.PORT || '3000'}`);
});
