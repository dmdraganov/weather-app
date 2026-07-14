import { useLanguage } from '../../../../../shared/i18n/useLanguage';
import { formatKmPerHour } from '../../../../../shared/utils/format-units';
import styles from './ChartPoint.module.scss';
import type { ChartPointData } from '../ForecastChart.model';
import Icon from '../../../../../shared/ui/Icon/Icon';

type ChartPointProps = ChartPointData;

const ChartPoint = ({
  x,
  y,
  time,
  temp,
  conditionIcon,
  windSpeed,
}: ChartPointProps) => {
  const [language] = useLanguage();

  return (
    <div
      className={styles.chartPoint}
      style={{
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
      <span className={styles.temp}>{temp}</span>
      <div className={styles.bottomContainer}>
        <Icon name={conditionIcon} className={styles.icon} />
        <span className={styles.windSpeed}>
          {formatKmPerHour(windSpeed, language)}
        </span>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
};

export default ChartPoint;
