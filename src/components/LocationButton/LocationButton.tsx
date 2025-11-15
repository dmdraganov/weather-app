import { useContext } from 'react';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import { Link } from 'react-router-dom';
import styles from './LocationButton.module.scss';
import sprite from '../../assets/icons/sprite.svg';

const LocationButton = ({ route }: { route: 'back' | 'forward' }) => {
  const [currentLocation] = useContext(CurrentLocationContext);
  const isBack = route === 'back';
  return (
    currentLocation && (
      <Link to={isBack ? '/' : 'location'} className={styles.button}>
        <svg className={styles.locationIcon}>
          <use xlinkHref={sprite + '#location'} />
        </svg>
        {currentLocation && (
          <h1 className={styles.currentLocation}>{currentLocation.name}</h1>
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
    )
  );
};

export default LocationButton;
