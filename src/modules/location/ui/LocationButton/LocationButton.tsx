import { Link } from 'react-router-dom';
import styles from './LocationButton.module.scss';
import sprite from '../../../../shared/assets/icons/sprite.svg';
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
      <svg className={styles.locationIcon}>
        <use xlinkHref={sprite + '#location'} />
      </svg>
      {currentLocation && (
        <h1 className={styles.selectedLocation}>{currentLocation.name}</h1>
      )}
      <svg
        className={
          styles.arrowIcon +
          ' ' +
          (isBack ? styles.backArrowIcon : styles.forwardArrowIcon)
        }
      >
        <use xlinkHref={sprite + '#arrow'} />
      </svg>
    </Link>
  );
};

export default LocationButton;
