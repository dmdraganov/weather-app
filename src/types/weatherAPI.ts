export interface ICondition {
	text: string;
	code: number;
}

interface IWeatherBase {
	temp_c: number;
	condition: ICondition;
	wind_kph: number;
}

interface IHourForecast extends IWeatherBase {
	time: string;
	is_day: number;
}

interface ICurrent extends IWeatherBase {
	is_day: number;
	cloud: number;
	feelslike_c: number;
	humidity: number;
	uv: number;
}

export interface IDayForecast {
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
		condition: ICondition;
		uv: number;
	};
	hour: IHourForecast[];
}

interface IForecast {
	forecastday: IDayForecast[];
}

interface ILocation {
	country: string;
	name: string;
	lat: number;
	lon: number;
}

export interface IWeatherData {
	current: ICurrent;
	forecast: IForecast;
	location: ILocation;
}
