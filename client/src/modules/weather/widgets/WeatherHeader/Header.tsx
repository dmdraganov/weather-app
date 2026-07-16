import styles from './Header.module.scss';
import { formatDate } from '../../../../shared/utils/format-date';
import { useMemo, useRef, type ReactNode } from 'react';
import { useLanguage } from '../../../../shared/i18n/useLanguage';
import Icon from '../../../../shared/ui/Icon/Icon';
import type { CurrentWeather } from '../../models';

interface HeaderProps {
  currentWeather: CurrentWeather;
  locationControl: ReactNode;
}

const Header = ({ currentWeather, locationControl }: HeaderProps) => {
  const { current: currentDate } = useRef(new Date());
  const [language] = useLanguage();

  const { weekday, day, month, year } = useMemo(
    () =>
      formatDate(currentDate, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        locale: language,
      }),
    [language, currentDate]
  );

  const { condition, temperature } = currentWeather;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.locationButton}>{locationControl}</div>
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
    </header>
  );
};

export default Header;
