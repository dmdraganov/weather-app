export interface ICondition {
	text: string;
	code: number;
}

interface IWeatherBase {
	temp_c: number;
	condition: ICondition;
	wind_kph: number;
	humidity: number;
	uv: number;
}

interface IHourForecast extends IWeatherBase {
	time_epoch: number;
	time: string;
	cloud: number;
	will_it_rain: number;
	will_it_snow: number;
}

interface ICurrent extends IWeatherBase {
	is_day: number;
	cloud: number;
	feelslike_c: number;
}

export interface IDayForecast {
	date_epoch: number;
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
