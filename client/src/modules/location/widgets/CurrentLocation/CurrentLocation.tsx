import { useLocationStore } from '../../models/store';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import LocationItem from '../../ui/LocationItem/LocationItem';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import styles from './CurrentLocation.module.scss';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';

const CurrentLocation = () => {
  const { currentLocation, favoriteLocations, toggleFavorite } = useLocationStore();
  const [, setCurrentLocation] = useCurrentLocation();
  const { t } = useTranslation('location');

  return (
    currentLocation && (
      <div className={styles.container}>
        <SectionHeading name={IconName.Explore} text={t('current_location')} />
        <LocationItem 
          name={currentLocation.name}
          description={currentLocation.description}
          isFavorite={favoriteLocations.some((f) => f.id === currentLocation.id)}
          onSetCurrentLocation={() => setCurrentLocation(currentLocation)}
          onToggleFavorite={() => toggleFavorite(currentLocation)}
        />
      </div>
    )
  );
};

export default CurrentLocation;
