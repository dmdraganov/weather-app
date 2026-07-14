import styles from './ForecastChart.module.scss';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import ChartPoint from './ChartPoint/ChartPoint';
import { useChartCanvas } from './useChartCanvas';
import { useDrag } from '../../../../shared/hooks/useDrag';
import { CANVAS_WIDTH } from './ForecastChart.model';

import { IconName } from '../../../../shared/ui/Icon/icon-map';
import type { DailyWeather } from '../../models';
import { calculateChartData } from './ForecastChart.data';
import { useLanguage } from '../../../../shared/i18n/useLanguage';
import { useChartHeight } from './useChartHeight';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';

interface ForecastChartProps {
  dailyWeatherList: DailyWeather[];
}

const ForecastChart = ({ dailyWeatherList }: ForecastChartProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.weather);
  const [language] = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartHeight = useChartHeight(chartRef);

  const twentyFourHours = useMemo(() => {
    return dailyWeatherList
      .slice(0, 2)
      .flatMap((dailyWeather) => dailyWeather.hourly);
  }, [dailyWeatherList]);

  const chartData = useMemo(() => {
    if (!chartHeight) return [];

    return calculateChartData(twentyFourHours, chartHeight, language, t);
  }, [twentyFourHours, chartHeight, language, t]);

  const canvasRef = useChartCanvas(chartData, chartHeight);
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
