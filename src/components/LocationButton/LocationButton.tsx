import { useContext } from 'react';
import { LocationContext } from '../../contexts/LocationContext';
import { Link } from 'react-router-dom';
import styles from './LocationButton.module.scss';
import sprite from '../../assets/icons/sprite.svg';

const LocationButton = ({ route }: { route: 'back' | 'forward' }) => {
  const { selectedLocation } = useContext(LocationContext);
  const isBack = route === 'back';
  return (
    <Link
      to={isBack ? '/' : '/location'}
      className={styles.button}
      style={!selectedLocation ? { visibility: 'hidden' } : undefined}
    >
      <svg className={styles.locationIcon}>
        <use xlinkHref={sprite + '#location'} />
      </svg>
      {selectedLocation && (
        <h1 className={styles.selectedLocation}>{selectedLocation.name}</h1>
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
