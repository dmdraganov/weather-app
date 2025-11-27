import styles from './DayForecast.module.scss';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react';
import { WeatherContext } from '../../../../contexts/WeatherContext';
import getWeatherIcon from '../../../../utilities/iconMapper';
import type { HourForecast } from '../../../../types/weatherAPI';

interface ChartData {
  time: string;
  temp: number;
  conditionIcon: string;
  windSpeed: number;
  x: number;
  y: number;
}

const POINTS_DISTANCE = 130;
const CANVAS_WIDTH = 25 * POINTS_DISTANCE;

const DayForecast = () => {
  const dayForecast = useContext(WeatherContext)!.forecast.forecastday;
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [dpr, setDpr] = useState(window.devicePixelRatio);
  const [isDragging, setIsDragging] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragStartXRef = useRef(0);
  const newOffsetRef = useRef(0);
  const offsetRef = useRef(0);
  const realTimeHour = new Date().getHours();

  const toChartData = useCallback(
    (hourlyForecast: HourForecast[], canvasHeight: number): ChartData[] => {
      const formattedHourlyForecast: ChartData[] = hourlyForecast
        .slice(realTimeHour, realTimeHour + 24)
        .map(({ time, temp_c, condition, is_day, wind_kph }, index) => ({
          time: index ? time.split(' ')[1] : 'Now',
          temp: temp_c,
          conditionIcon: getWeatherIcon(condition.code, !!is_day),
          windSpeed: wind_kph,
          x: 0,
          y: 0,
        }));

      const tempArr = formattedHourlyForecast.map(({ temp }) => temp);
      const minTemp = Math.min(...tempArr);
      const maxTemp = Math.max(...tempArr);
      const maxDiff = maxTemp - minTemp;

      formattedHourlyForecast.forEach((hourForecast, index, arr) => {
        hourForecast.y =
          (canvasHeight! - 6) * ((maxTemp - hourForecast.temp) / maxDiff) + 3;
        hourForecast.x =
          CANVAS_WIDTH * ((index + 1) / arr.length) - POINTS_DISTANCE / 2;
      });
      return formattedHourlyForecast;
    },
    [realTimeHour]
  );

  const drawChart = useCallback(
    (chartData: ChartData[], canvasHeight: number) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvasHeight);
      ctx.scale(dpr, dpr);

      ctx.beginPath();
      ctx.strokeStyle = '#ffc355';
      ctx.lineWidth = 2;

      ctx.moveTo(0, chartData[0].y);
      chartData.forEach(({ x, y }) => ctx.lineTo(x, y));
      ctx.lineTo(CANVAS_WIDTH, chartData[23].y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(chartData[0].x, chartData[0].y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffffff';
      ctx.fill();
    },
    [dpr]
  );

  useEffect(() => {
    const handleDprChange = () => {
      const currentDpr = window.devicePixelRatio;
      if (Math.abs(currentDpr - dpr) > 0.15) setDpr(currentDpr);
    };
    window.addEventListener('resize', handleDprChange);

    canvasRef.current!.style.width = `${CANVAS_WIDTH}px`;
    return () => {
      window.removeEventListener('resize', handleDprChange);
    };
  }, []);

  useLayoutEffect(() => {
    if (
      !canvasRef.current ||
      !chartContainerRef.current ||
      !canvasContainerRef.current
    )
      return;
    const height = canvasContainerRef.current.clientHeight;
    canvasContainerRef.current.style.height = `${height} px`;
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = height * dpr;

    const chartData = toChartData(
      [...dayForecast[0].hour, ...dayForecast[1].hour],
      height
    );
    setChartData(chartData);
    drawChart(chartData, height);
  }, [dpr, dayForecast, toChartData, drawChart]);

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

    const maxOffset = -(CANVAS_WIDTH - canvasContainer.clientWidth);
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
    <section className={styles.container + ' division'}>
      <SectionHeading iconId='clock' text='24-hours forecast' />
      <div
        className={styles.chart}
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
          <canvas ref={canvasRef} className={styles.canvas} />
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
