import { useLanguage } from '../../../localization/hooks/useLanguage';
import { formatKmPerHour } from '../../../../shared/utils/units-formatter';
import styles from './HourlyChart.module.scss';
import type { ChartPointData } from '../../models/hourly-chart';

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
        <svg className={styles.icon}>
          <use xlinkHref={conditionIcon} />
        </svg>
        <span className={styles.windSpeed}>
          {formatKmPerHour(windSpeed, language)}
        </span>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
};

export default ChartPoint;
