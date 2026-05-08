import styles from './Header.module.scss';
import { formatDate } from '../../../../shared/utils/date-formatter';
import { WeatherContext } from '../../contexts/WeatherContext';
import { useContext } from 'react';
import LocationButton from '../../../location/ui/LocationButton/LocationButton';
import { useLanguage } from '../../../localization/hooks/useLanguage';

const Header = () => {
  const currentWeather = useContext(WeatherContext)!.current;
  const { condition, temperature } = currentWeather;
  const [language] = useLanguage();
  const currentDate = new Date();
  const { weekday, day, month, year } = formatDate(currentDate, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    locale: language,
  });

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.locationButton}>
              <LocationButton route='forward' />
            </div>
            <span className={styles.weatherCondition}>{condition.text}</span>
            <div className={styles.flexContainer}>
              <span className={styles.weatherTemp}>
                {temperature.celsius} &deg;C
              </span>
              <time dateTime={''}>
                {weekday} | {day} {month} {year}
              </time>
            </div>
          </div>
          <svg className={styles.weatherIcon}>
            <use xlinkHref={condition.icon} />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
