import styles from './DayForecast.module.scss';
import SectionHeading from '../../SectionHeading/SectionHeading';
import {
	useContext,
	useEffect,
	useRef,
	useState,
	type PointerEvent,
} from 'react';
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
const canvasWidth = 25 * POINTS_DISTANCE;

const DayForecast = () => {
	const dayForecast = useContext(APIContext)!.forecast.forecastday;
	const [chartData, setChartData] = useState<IChartData[] | null>(null);
	const [dpr, setDpr] = useState(window.devicePixelRatio);
	const [isDragging, setIsDragging] = useState(false);
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const dragStartXRef = useRef(0);
	const newOffsetRef = useRef(0);
	const offsetRef = useRef(0);

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
			hourForecast.x = canvasWidth * ((index + 1) / (chartData.length + 1));
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
			ctx.lineTo(canvasWidth, chartData[23].y);
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(chartData[0].x, chartData[0].y, 3, 0, 2 * Math.PI);
			ctx.fillStyle = '#ffffffff';
			ctx.fill();
		}
	}, [chartData, dpr]);

	const handleDragStart = (e: PointerEvent) => {
		canvasContainerRef.current!.setPointerCapture(e.pointerId);
		dragStartXRef.current = e.clientX;

		setIsDragging(true);
	};

	const handleDragMove = ({ clientX }: PointerEvent) => {
		if (!isDragging) return;
		const canvasContainer = canvasContainerRef.current!;
		const dragStartX = dragStartXRef.current;
		const offset = offsetRef.current;

		const maxOffset = -(canvasWidth - canvasContainer.clientWidth);
		const newOffset = offset + (clientX - dragStartX);

		if (newOffset <= 0 && newOffset >= maxOffset) {
			newOffsetRef.current = newOffset;
			canvasContainer.style.transform = `translateX(${newOffset}px)`;
		}
	};

	const handleDragEnd = (e: PointerEvent) => {
		canvasContainerRef.current!.releasePointerCapture(e.pointerId);
		offsetRef.current = newOffsetRef.current;

		setIsDragging(false);
	};

	return (
		<section
			className={`${styles.container} division flex-container flex-container--column`}
		>
			<SectionHeading iconID='clock' text='24-hours forecast' />
			<div
				className={`${styles.chart} flex-container__flex-item`}
				ref={chartContainerRef}
				onPointerDown={handleDragStart}
				onPointerMove={handleDragMove}
				onPointerUp={handleDragEnd}
				onPointerCancel={handleDragEnd}
				style={{
					cursor: isDragging ? 'grabbing' : 'grab',
				}}
			>
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
