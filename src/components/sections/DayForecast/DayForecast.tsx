import styles from './DayForecast.module.scss';
import SectionHeading from '../../SectionHeading/SectionHeading';
import { useContext, useEffect, useRef, useState } from 'react';
import APIContext from '../../../contexts/APIContext';
import { getWeatherIcon } from '../../../utilities/iconMapper';

interface IChartData {
	x: number;
	y: number;
	time: string;
	temp: number;
	conditionIcon: string;
	windSpeed: number;
}

const DayForecast = () => {
	const daysForecasts = useContext(APIContext)!.forecast.forecastday;
	const [chartData, setChartData] = useState<IChartData[] | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const currentTime = new Date().getHours();

	useEffect(() => {
		const canvas = canvasRef.current!;

		const hoursForecast = [...daysForecasts[0].hour, ...daysForecasts[1].hour];
		const forecastsData = hoursForecast
			.filter(
				(hourForecast, index) =>
					index <= currentTime + 23 && index >= currentTime
			)
			.map(hourForecast => ({
				time: hourForecast.time.split(' ')[1],
				temp: hourForecast.temp_c,
				conditionIcon: getWeatherIcon(
					hourForecast.condition.code,
					!!hourForecast.is_day
				),
				windSpeed: hourForecast.wind_kph,
			}));
		forecastsData[0].time = 'Now';

		const tempArr = forecastsData.map(({ temp }) => temp);
		const minTemp = Math.min(...tempArr);
		const maxTemp = Math.max(...tempArr);
		const maxDiff = maxTemp - minTemp;

		const chartData = forecastsData.map((hourForecast, index, arr) => {
			const currentDiff = maxTemp - hourForecast.temp;
			const pointY = (canvas.height - 50) * (currentDiff / maxDiff);
			const pointX = canvas.width * ((index + 1) / arr.length);

			return { ...hourForecast, x: pointX, y: pointY };
		});

		canvas.width = chartData.length * 85;
		setChartData(chartData);
	}, [daysForecasts, currentTime]);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(drawChart);
		resizeObserver.observe(canvasRef.current!);

		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		drawChart();
	}, [chartData]);

	const drawChart = () => {
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext('2d');

		if (ctx && chartData) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.beginPath();
			ctx.strokeStyle = '#ffc355';
			ctx.lineWidth = 2;

			ctx.moveTo(0, chartData[0].y);
			chartData.forEach(({ x, y }, index) => ctx.lineTo(x, y));
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(chartData[0].x, chartData[0].y, 3, 0, 2 * Math.PI);
			ctx.fillStyle = '#ffffffff';
			ctx.fill();
		}
	};

	return (
		<section
			className={`division flex-container flex-container--column flex-container__flex-item`}
		>
			<SectionHeading iconID='clock' text='24-hours forecast' />
			<div className={`${styles.canvasContainer} flex-container__flex-item`}>
				<canvas ref={canvasRef} className={styles.canvas} />
				{chartData &&
					chartData.map((el, i) => (
						<div
							key={i}
							className={styles.chartPoint}
							style={{
								position: 'absolute',
								left: el.x - 18,
								top: el.y - 25,
							}}
						>
							<span className={styles.temp}>{el.temp}&deg;</span>
							<div className={styles.bottom}>
								<svg className={styles.icon}>
									<use xlinkHref={el.conditionIcon} />
								</svg>
								<span className={styles.windSpeed}>{el.windSpeed}km/h</span>
								<span className={styles.time}>{el.time}</span>
							</div>
						</div>
					))}
			</div>
		</section>
	);
};

export default DayForecast;
