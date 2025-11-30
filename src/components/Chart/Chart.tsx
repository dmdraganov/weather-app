import {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react';
import { WeatherContext } from '../../contexts/WeatherContext';
import type { HourForecast } from '../../types/weatherAPI';
import getWeatherIcon from '../../utilities/iconMapper';
import styles from './Chart.module.scss';

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
const POINT_RADIUS = 3;

const Chart = () => {
  const dayForecast = useContext(WeatherContext)!.forecast.forecastday;
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [dpr, setDpr] = useState(window.devicePixelRatio);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastXRef = useRef(0);
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
      const areaHeight = canvasHeight - POINT_RADIUS * 2;
      formattedHourlyForecast.forEach((hourForecast, index, arr) => {
        hourForecast.y =
          areaHeight * ((maxTemp - hourForecast.temp) / maxDiff) + POINT_RADIUS;
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

      //draw line
      ctx.beginPath();
      ctx.strokeStyle = '#ffc355';
      ctx.lineWidth = 2;
      ctx.moveTo(0, chartData[0].y);
      chartData.forEach(({ x, y }) => ctx.lineTo(x, y));
      ctx.lineTo(CANVAS_WIDTH, chartData[23].y);
      ctx.stroke();

      //draw point
      ctx.beginPath();
      ctx.arc(chartData[0].x, chartData[0].y, POINT_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffffff';
      ctx.fill();
    },
    [dpr]
  );

  useLayoutEffect(() => {
    const container = chartRef.current;
    if (!container) return;
    const handleWindowResize = () => {
      offsetRef.current = 0;
      container.style.transform = `translateX(0px)`;
      setContainerHeight(container.getBoundingClientRect().height);
      const newDpr = window.devicePixelRatio;
      if (newDpr !== dpr) setDpr(newDpr);
    };
    setContainerHeight(container.getBoundingClientRect().height);
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (!canvasRef.current || !containerHeight) return;
    const height = containerHeight;
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = height * dpr;

    const chartData = toChartData(
      [...dayForecast[0].hour, ...dayForecast[1].hour],
      height
    );
    setChartData(chartData);
    drawChart(chartData, height);
  }, [dpr, containerHeight, dayForecast, toChartData, drawChart]);

  const handleDragStart = (e: PointerEvent) => {
    if (!chartContainerRef.current) return;
    chartContainerRef.current.setPointerCapture(e.pointerId);
    lastXRef.current = e.clientX;
    setIsDragging(true);
  };

  const handleDragMove = ({ clientX }: PointerEvent) => {
    const chartContainer = chartContainerRef.current;
    if (!isDragging || !chartContainer) return;
    const maxOffset = -(CANVAS_WIDTH - chartContainer.clientWidth);
    const lastX = lastXRef.current;
    let offset = offsetRef.current;
    const diff = clientX - lastX;
    lastXRef.current = clientX;
    offset += diff;
    if (offset > 0) offset = 0;
    if (offset < maxOffset) offset = maxOffset;
    chartRef.current!.style.transform = `translateX(${offset}px)`;
    offsetRef.current = offset;
  };

  const handleDragEnd = (e: PointerEvent) => {
    if (!chartContainerRef.current) return;
    chartContainerRef.current.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  return (
    <div
      className={styles.container}
      ref={chartContainerRef}
      onPointerDown={handleDragStart}
      onPointerMove={handleDragMove}
      onPointerUp={handleDragEnd}
      onPointerCancel={handleDragEnd}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div ref={chartRef} className={styles.chart}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          style={{ width: CANVAS_WIDTH }}
        />
        {chartData &&
          chartData.map(({ x, y, time, temp, conditionIcon, windSpeed }, i) => (
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
          ))}
      </div>
    </div>
  );
};

export default Chart;
