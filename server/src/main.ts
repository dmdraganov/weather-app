import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { WeatherService } from './modules/weather/weather.service.js';
import { WeatherController } from './modules/weather/weather.controller.js';
import { WeatherRouter } from './modules/weather/weather.routes.js';
import { env } from './config/env.js';
import { createRateLimit } from './middleware/rate-limit.js';

const app = express();
app.set('trust proxy', 1);

const allowedOrigins = new Set(env.corsOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin === undefined || allowedOrigins.has(origin));
    },
  })
);

const weatherService = new WeatherService(env.weatherApiKey, {
  requestTimeoutMs: env.weatherRequestTimeoutMs,
  cacheTtlMs: env.weatherCacheTtlMs,
  cacheMaxEntries: env.weatherCacheMaxEntries,
});
const weatherController = new WeatherController(weatherService);
const weatherRouter = new WeatherRouter(weatherController);
const weatherRateLimit = createRateLimit({
  windowMs: env.rateLimitWindowMs,
  maxRequests: env.rateLimitMaxRequests,
});

app.use('/api/weather', weatherRateLimit, weatherRouter.router);

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
