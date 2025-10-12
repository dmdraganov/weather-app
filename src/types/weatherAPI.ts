import type { Location } from './locationApi';

export interface Condition {
	text: string;
	code: number;
}

interface WeatherBase {
	temp_c: number;
	condition: Condition;
	wind_kph: number;
}

interface HourForecast extends WeatherBase {
	time: string;
	is_day: number;
}

interface Current extends WeatherBase {
	is_day: number;
	cloud: number;
	feelslike_c: number;
	humidity: number;
	uv: number;
}

export interface DayForecast {
	date_epoch: number;
	astro: {
		sunrise: string;
		sunset: string;
		moon_phase: string;
		moon_illumination: number;
	};
	day: {
		maxtemp_c: number;
		mintemp_c: number;
		maxwind_kph: number;
		avghumidity: number;
		daily_chance_of_rain: number;
		daily_chance_of_snow: number;
		condition: Condition;
		uv: number;
	};
	hour: HourForecast[];
}

interface Forecast {
	forecastday: DayForecast[];
}

export interface WeatherData {
	current: Current;
	forecast: Forecast;
	location: Location;
}
