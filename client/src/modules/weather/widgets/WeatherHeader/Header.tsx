import styles from './Header.module.scss';
import { formatDate } from '../../../../shared/utils/format-date';
import { useMemo, useRef, useState } from 'react';
import LocationButton from '../../../location/ui/LocationButton/LocationButton';
import { useLanguage } from '../../../localization/hooks/useLanguage';
import Icon from '../../../../shared/ui/Icon/Icon';
import LocationSearch from '../../../location/widgets/LocationSearch/LocationSearch';
import type { CurrentWeather } from '../../models';
import { Modal } from '../../../../shared/ui/Modal/Modal';

interface HeaderProps {
  currentWeather: CurrentWeather;
}

const Header = ({ currentWeather }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
        <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
          <LocationSearch />
        </Modal>
      )}
    </header>
  );
};

export default Header;
