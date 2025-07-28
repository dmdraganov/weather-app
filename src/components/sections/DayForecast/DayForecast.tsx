import styles from './DayForecast.module.scss';
import SectionHeading from '../../SectionHeading/SectionHeading';
import { useContext, useEffect, useRef, useState } from 'react';
import APIContext from '../../../contexts/APIContext';
import { getWeatherIcon } from '../../../utilities/iconMapper';

interface IChartData {
	time: string;
	temp: number;
	conditionIcon: string;
	windSpeed: number;
	x: number;
	y: number;
}

const POINTS_DISTANCE = 150;
const CANVAS_HEIGHT = 100;
const canvasWidth = 24 * POINTS_DISTANCE;

const DayForecast = () => {
	const dayForecast = useContext(APIContext)!.forecast.forecastday;
	const [chartData, setChartData] = useState<IChartData[] | null>(null);
	const [dpr, setDpr] = useState(window.devicePixelRatio);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const realTimeHour = new Date().getHours();

	useEffect(() => {
		const hourlyForecast = [...dayForecast[0].hour, ...dayForecast[1].hour];
		const chartData: IChartData[] = hourlyForecast
			.slice(realTimeHour, realTimeHour + 24)
			.map(({ time, temp_c, condition, wind_kph, is_day }, i) => ({
				time: i ? time.split(' ')[1] : 'Now',
				temp: temp_c,
				conditionIcon: getWeatherIcon(condition.code, !!is_day),
				windSpeed: wind_kph,
				x: 0,
				y: 0,
			}));

		const tempArr = chartData.map(({ temp }) => temp);
		const minTemp = Math.min(...tempArr);
		const maxTemp = Math.max(...tempArr);
		const maxDiff = maxTemp - minTemp;

		chartData.forEach((hourForecast, index) => {
			hourForecast.y =
				(CANVAS_HEIGHT - 6) * ((maxTemp - hourForecast.temp) / maxDiff) + 3;
			hourForecast.x = canvasWidth * ((index + 1) / chartData.length);
		});

		setChartData(chartData);
	}, [dayForecast, realTimeHour, POINTS_DISTANCE]);

	useEffect(() => {
		const canvas = canvasRef.current!;
		canvas.width = canvasWidth * dpr;
		canvas.height = CANVAS_HEIGHT * dpr;
	}, [dpr]);

	useEffect(() => {
		const handleDprChange = () => {
			const currentDpr = window.devicePixelRatio;
			if (Math.abs(currentDpr - dpr) > 0.15) setDpr(currentDpr);
		};
		window.addEventListener('resize', handleDprChange);

		canvasRef.current!.style.width = `${canvasWidth}px`;

		return () => {
			window.removeEventListener('resize', handleDprChange);
		};
	}, []);

	useEffect(() => {
		if (!chartData) return;
		const canvas = canvasRef.current!;
		const ctx = canvas.getContext('2d');

		if (ctx) {
			ctx.scale(dpr, dpr);
			ctx.clearRect(0, 0, canvas.width, CANVAS_HEIGHT);

			ctx.beginPath();
			ctx.strokeStyle = '#ffc355';
			ctx.lineWidth = 2;

			ctx.moveTo(0, chartData[0].y);
			chartData.forEach(({ x, y }) => ctx.lineTo(x, y));
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(chartData[0].x, chartData[0].y, 3, 0, 2 * Math.PI);
			ctx.fillStyle = '#ffffffff';
			ctx.fill();
		}
	}, [chartData, dpr]);

	return (
		<section
			className={`${styles.container} division flex-container flex-container--column`}
		>
			<SectionHeading iconID='clock' text='24-hours forecast' />
			<div className={`${styles.chart} flex-container__flex-item`}>
				<div ref={canvasContainerRef} className={styles.canvasContainer}>
					<canvas
						ref={canvasRef}
						className={styles.canvas}
						height={CANVAS_HEIGHT}
					/>
					{chartData &&
						chartData.map(
							({ x, y, time, temp, conditionIcon, windSpeed }, i) => (
								<div
									key={i}
									className={styles.chartPoint}
									style={{
										position: 'absolute',
										left: x,
										top: y,
									}}
								>
									<span className={styles.temp}>{temp}</span>
									<div className={styles.bottomContainer}>
										<svg className={styles.icon}>
											<use xlinkHref={conditionIcon} />
										</svg>
										<span className={styles.windSpeed}>{windSpeed}km/h</span>
										<span className={styles.time}>{time}</span>
									</div>
								</div>
							)
						)}
				</div>
			</div>
		</section>
	);
};

export default DayForecast;
