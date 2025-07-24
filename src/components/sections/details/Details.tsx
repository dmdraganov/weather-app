import { useContext, useState } from 'react';
import styles from './Details.module.scss';
import sprite from '../../../assets/icons/sprite.svg';
import APIContext from '../../../contexts/APIContext';
import { formatDate } from '../../../utilities/dateFormatter';
import { getWeatherIcon } from '../../../utilities/iconMapper';
import Slider from '../../Slider/Slider';

const Details = () => {
	const [selectedDay, setSelectedDay] = useState<number>(0);
	const forecasts = useContext(APIContext)!.forecast.forecastday;
	const dayForecast = forecasts[selectedDay].day;

	const sliderDaysList = forecasts.map(element => {
		return {
			dayName: formatDate(new Date(element.date_epoch * 1000))[0],
			iconCode: element.day.condition.code,
		};
	});

	const conditionsList = [
		{
			iconID: 'thermometer',
			title: 'Temp',
			value: `${dayForecast.mintemp_c}\u00B0 / ${dayForecast.maxtemp_c}\u00B0`,
		},
		{
			iconID: 'wind',
			title: 'Wind',
			value: dayForecast.maxwind_kph + ' km/h',
		},
		{
			iconID: 'blob',
			title: 'Chance of rain',
			value: dayForecast.daily_chance_of_rain + '%',
		},
		{
			iconID: 'blob',
			title: 'Average humidity',
			value: dayForecast.avghumidity + '%',
		},
		{
			iconID: 'sunny',
			title: 'UV index',
			value: dayForecast.uv,
		},
	];

	return (
		<section className={`${styles.container} division`}>
			<Slider
				selectedSlide={selectedDay}
				setSelectedSlide={setSelectedDay}
				visibleSlides={3}
				slidesAmount={sliderDaysList.length}
			>
				{sliderDaysList.map((day, i) => (
					<div
						key={i}
						className={`${styles.slide} ${
							i === selectedDay ? styles.active : ''
						}`}
						onClick={() => setSelectedDay(i)}
					>
						<span>{day.dayName}</span>
						<svg className={styles.icon}>
							<use xlinkHref={getWeatherIcon(day.iconCode)} />
						</svg>
					</div>
				))}
			</Slider>
			<h2 className={styles.heading}>Air conditions</h2>
			<ul className={styles.conditionsList}>
				{conditionsList.map(({ iconID, title, value }) => (
					<li key={title} className={styles.condition}>
						<svg className={styles.icon}>
							<use xlinkHref={sprite + '#' + iconID} />
						</svg>
						<div className={styles.text}>
							<h3 className={styles.conditionTitle}>{title}</h3>
							<span>{value}</span>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Details;
