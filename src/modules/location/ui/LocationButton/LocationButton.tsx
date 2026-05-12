import { Link } from 'react-router-dom';
import styles from './LocationButton.module.scss';
import LocationIcon from '../../../../shared/assets/icons/ui/location.svg?react';
import ArrowIcon from '../../../../shared/assets/icons/ui/arrow.svg?react';
import { useLocationStore } from '../../models/store';

const LocationButton = ({ route }: { route: 'back' | 'forward' }) => {
  const { currentLocation } = useLocationStore();

  const isBack = route === 'back';
  return (
    <Link
      to={isBack ? '/' : '/location'}
      className={styles.button}
      style={!currentLocation ? { visibility: 'hidden' } : undefined}
    >
      <LocationIcon className={styles.locationIcon} />
      {currentLocation && (
        <h1 className={styles.selectedLocation}>{currentLocation.name}</h1>
      )}
      <ArrowIcon
        className={
          styles.arrowIcon +
          ' ' +
          (isBack ? styles.backArrowIcon : styles.forwardArrowIcon)
        }
      />
    </Link>
  );
};

export default LocationButton;
