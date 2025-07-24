import styles from './DayForecast.module.scss';
import SectionHeading from '../../SectionHeading/SectionHeading';
import { useContext, useEffect } from 'react';
import APIContext from '../../../contexts/APIContext';
import { getWeatherIcon } from '../../../utilities/iconMapper';

interface IChartData {
	time: string;
	temp: number;
	conditionIcon: string;
	windSpeed: number;
}

const DayForecast = () => {
	const daysForecasts = useContext(APIContext)!.forecast.forecastday;
	const hoursForecast = [...daysForecasts[0].hour, ...daysForecasts[1].hour];

	const currentTime = new Date().getHours();
	let chartData: IChartData[];

	useEffect(() => {
		chartData = hoursForecast
			.filter(
				(hourForecast, index) =>
					index <= currentTime + 23 && index >= currentTime
			)
			.map(hourForecast => {
				return {
					time: hourForecast.time.split(' ')[1],
					temp: hourForecast.temp_c,
					conditionIcon: getWeatherIcon(
						hourForecast.condition.code,
						!!hourForecast.is_day
					),
					windSpeed: hourForecast.wind_kph,
				};
			});
		chartData[0].time = 'Now';
	}, [hoursForecast, currentTime]);

	return (
		<section className={`division flex-container__flex-item`}>
			<SectionHeading iconID='clock' text='24-hours forecast' />
		</section>
	);
};

export default DayForecast;
