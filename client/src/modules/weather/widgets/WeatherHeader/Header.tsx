import styles from './Header.module.scss';
import { formatDate } from '../../../../shared/utils/date-formatter';
import { WeatherContext } from '../../contexts/WeatherContext';
import { useContext, useMemo, useState } from 'react';
import LocationButton from '../../../location/ui/LocationButton/LocationButton';
import { useLanguage } from '../../../localization/hooks/useLanguage';
import Icon from '../../../../shared/ui/Icon/Icon';
import LocationSearch from '../../../location/widgets/LocationSearch/LocationSearch';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [language] = useLanguage();
  const weatherData = useContext(WeatherContext);

  const currentDate = new Date();
  const { weekday, day, month, year } = useMemo(
    () =>
      formatDate(currentDate, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        locale: language,
      }),
    [language, currentDate.getDate()]
  );

  if (!weatherData) return null;

  const currentWeather = weatherData.current;
  const { condition, temperature } = currentWeather;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.locationButton}>
            <LocationButton
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              arrowDirection='forward'
            />
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
        <Icon name={condition.icon} className={styles.weatherIcon} />
      </div>
      {isSearchOpen && (
        <div className={styles.searchContainer}>
          <LocationSearch />
        </div>
      )}
    </header>
  );
};

export default Header;
