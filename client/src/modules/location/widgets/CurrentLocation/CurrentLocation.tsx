import { useLocationStore } from '../../model/store/store';
import { useCurrentLocation } from '../../model/store/useCurrentLocation';
import LocationItem from '../../ui/LocationItem/LocationItem';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import styles from './CurrentLocation.module.scss';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';

const CurrentLocation = () => {
  const { currentLocation, favoriteLocations, toggleFavorite } =
    useLocationStore();
  const [, setCurrentLocation] = useCurrentLocation();
  const { t } = useTranslation(I18N_NAMESPACES.location);

  return (
    currentLocation && (
      <div className={styles.container}>
        <SectionHeading
          iconName={IconName.Explore}
          text={t('current_location')}
        />
        <LocationItem
          name={currentLocation.name}
          description={currentLocation.description}
          isFavorite={favoriteLocations.some(
            (f) => f.id === currentLocation.id
          )}
          onSelect={() => setCurrentLocation(currentLocation)}
          onToggleFavorite={() => toggleFavorite(currentLocation)}
        />
      </div>
    )
  );
};

export default CurrentLocation;
