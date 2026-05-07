import styles from './LocationItem.module.scss';
import sprite from '/src/shared/assets/icons/sprite.svg';
import type { Location } from '../../models/location.model';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useLocationStore } from '../../models/store';

interface LocationItemProps {
  location: Location;
}

const LocationItem = ({ location }: LocationItemProps) => {
  const [, setCurrentLocation] = useCurrentLocation();
  const { favoriteLocations, toggleFavorite } = useLocationStore();

  const isFavorite = favoriteLocations.some(
    (favoriteLocation) => favoriteLocation.id === location.id
  );

  const handleAddToFavorites = () => {
    toggleFavorite(location);
  };

  return (
    <li className={styles.item}>
      <div
        className={styles.itemText}
        onClick={() => {
          setCurrentLocation(location);
        }}
      >
        <h3 className={styles.itemHeading}>{location.name}</h3>
        <span className={styles.itemAddition}>
          {location.country + (location.region ? ', ' + location.region : '')}
        </span>
      </div>
      <button
        className={styles.favoriteButton}
        onClick={handleAddToFavorites}
        style={isFavorite ? { opacity: 1 } : undefined}
      >
        <svg
          className={styles.favoriteIcon}
          style={isFavorite ? { color: 'white' } : undefined}
        >
          <use xlinkHref={sprite + '#heart'} />
        </svg>
      </button>
    </li>
  );
};

export default LocationItem;
