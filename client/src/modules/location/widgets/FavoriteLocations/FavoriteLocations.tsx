import { useLocationStore } from '../../model/store/store';
import { useCurrentLocation } from '../../model/store/useCurrentLocation';
import LocationItem from '../../ui/LocationItem/LocationItem';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import styles from './FavoriteLocations.module.scss';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';

const FavoriteLocations = () => {
  const { favoriteLocations, toggleFavorite } = useLocationStore();
  const [, setCurrentLocation] = useCurrentLocation();
  const { t } = useTranslation(I18N_NAMESPACES.location);

  return (
    !!favoriteLocations.length && (
      <section className={'division ' + styles.container}>
        <SectionHeading
          iconName={IconName.Heart}
          text={t('favorite_locations')}
        />
        <ul className={styles.list}>
          {favoriteLocations.map((location) => (
            <LocationItem
              key={location.id}
              name={location.name}
              description={location.description}
              isFavorite={favoriteLocations.some((f) => f.id === location.id)}
              onSelect={() => setCurrentLocation(location)}
              onToggleFavorite={() => toggleFavorite(location)}
            />
          ))}
        </ul>
      </section>
    )
  );
};

export default FavoriteLocations;
