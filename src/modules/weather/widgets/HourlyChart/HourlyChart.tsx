import { useRef } from 'react';
import styles from './HourlyChart.module.scss';
import ChartPoint from './ChartPoint';
import { useChartCanvas } from '../../hooks/useChartCanvas';
import { useDrag } from '../../../../shared/hooks/useDrag';
import { CANVAS_WIDTH } from '../../models/hourly-chart';

const HourlyChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasRef, chartRef, chartData } = useChartCanvas();
  const { isDragging, handlers } = useDrag({
    containerRef,
    contentRef: chartRef,
    contentWidth: CANVAS_WIDTH,
  });

  return (
    <div
      className={styles.container}
      ref={containerRef}
      {...handlers}
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
        {chartData?.map((point, i) => (
          <ChartPoint key={i} {...point} />
        ))}
      </div>
    </div>
  );
};

export default HourlyChart;
