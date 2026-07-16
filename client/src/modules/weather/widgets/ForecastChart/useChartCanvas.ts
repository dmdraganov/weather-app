import { useLayoutEffect, useRef } from 'react';

import {
  CANVAS_WIDTH,
  POINT_RADIUS,
  type ChartPointData,
} from './ForecastChart.model';

const drawChart = (
  canvas: HTMLCanvasElement,
  data: ChartPointData[],
  canvasHeight: number,
  dpr: number
) => {
  const ctx = canvas.getContext('2d');

  if (!ctx || !data.length) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, CANVAS_WIDTH, canvasHeight);

  ctx.beginPath();
  ctx.strokeStyle = '#ffc355';
  ctx.lineWidth = 2;
  ctx.moveTo(0, data[0].y);
  data.forEach(({ x, y }) => ctx.lineTo(x, y));
  ctx.lineTo(CANVAS_WIDTH, data[data.length - 1].y);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(data[0].x, data[0].y, POINT_RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffffff';
  ctx.fill();
};

export const useChartCanvas = (
  chartData: ChartPointData[],
  chartHeight: number
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current || !chartHeight || !chartData.length) return;

    const dpr = window.devicePixelRatio;
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = chartHeight * dpr;

    drawChart(canvas, chartData, chartHeight, dpr);
  }, [chartData, chartHeight]);

  return canvasRef;
};
