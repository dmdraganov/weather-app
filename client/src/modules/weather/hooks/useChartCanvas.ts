import type { HourlyWeather } from './../models/forecast';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { useChartData } from './useChartData';
import {
  CANVAS_WIDTH,
  POINT_RADIUS,
  type ChartPointData,
} from '../models/hourly-chart';

export const useChartCanvas = (hourlyWeather: HourlyWeather[]) => {
  const toChartData = useChartData();

  const [chartData, setChartData] = useState<ChartPointData[] | null>(null);
  const [dpr, setDpr] = useState(window.devicePixelRatio);
  const [containerHeight, setContainerHeight] = useState(0);

  const chartRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef(0);

  const drawChart = useCallback(
    (data: ChartPointData[], canvasHeight: number) => {
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
      ctx.moveTo(0, data[0].y);
      data.forEach(({ x, y }) => ctx.lineTo(x, y));
      ctx.lineTo(CANVAS_WIDTH, data[23].y);
      ctx.stroke();

      //draw point
      ctx.beginPath();
      ctx.arc(data[0].x, data[0].y, POINT_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffffff';
      ctx.fill();
    },
    [dpr]
  );

  useLayoutEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const handleWindowResize = () => {
      offsetRef.current = 0;
      chart.style.transform = `translateX(0px)`;
      setContainerHeight(chart.getBoundingClientRect().height);
      const newDpr = window.devicePixelRatio;
      if (newDpr !== dpr) setDpr(newDpr);
    };

    setContainerHeight(chart.getBoundingClientRect().height);
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [dpr]);

  useLayoutEffect(() => {
    if (!canvasRef.current || !containerHeight) return;
    const height = containerHeight;
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = height * dpr;

    const data = toChartData(hourlyWeather, height);

    setChartData(data);
    drawChart(data, height);
  }, [dpr, containerHeight, hourlyWeather, toChartData, drawChart]);

  return { canvasRef, chartRef, chartData };
};
