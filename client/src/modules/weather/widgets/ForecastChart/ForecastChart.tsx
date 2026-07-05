import styles from './ForecastChart.module.scss';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import ChartPoint from '../../ui/ChartPoint/ChartPoint';
import { useChartCanvas } from '../../hooks/useChartCanvas';
import { useDrag } from '../../../../shared/hooks/useDrag';
import { CANVAS_WIDTH } from '../../models/hourly-chart';

import { IconName } from '../../../../shared/ui/Icon/icon-map';
import type { DailyWeather } from '../../models';

interface ForecastChartProps {
  dailyWeatherList: DailyWeather[];
}

const ForecastChart = ({ dailyWeatherList }: ForecastChartProps) => {
  const { t } = useTranslation('weather');
  const containerRef = useRef<HTMLDivElement>(null);
  const twentyFourHours = useMemo(() => {
    return dailyWeatherList
      .slice(0, 2)
      .map((d) => d.hourly)
      .flat();
  }, [dailyWeatherList]);

  const { canvasRef, chartRef, chartData } = useChartCanvas(twentyFourHours);
  const { isDragging, handlers } = useDrag({
    containerRef,
    contentRef: chartRef,
    contentWidth: CANVAS_WIDTH,
  });

  return (
    <section className={styles.container + ' division'}>
      <SectionHeading iconName={IconName.Clock} text={t('day_forecast')} />
      <div
        className={styles.chartContainer}
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
    </section>
  );
};

export default ForecastChart;
