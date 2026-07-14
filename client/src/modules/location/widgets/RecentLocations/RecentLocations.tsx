import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import LocationItem from '../../ui/LocationItem/LocationItem';
import { useLocationStore } from '../../model/store/store';
import styles from './RecentLocations.module.scss';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';
import { I18N_NAMESPACES } from '../../../../shared/config/i18n';
import { useChangeCurrentLocation } from '../../hooks/useChangeLocation';

const RecentLocations = () => {
  const recentLocations = useLocationStore((state) => state.recentLocations);
  const favoriteLocations = useLocationStore(
    (state) => state.favoriteLocations
  );
  const toggleFavorite = useLocationStore((state) => state.toggleFavorite);
  const changeCurrentLocation = useChangeCurrentLocation();
  const { t } = useTranslation(I18N_NAMESPACES.location);

  return (
    !!recentLocations.length && (
      <section className='division'>
        <SectionHeading
          iconName={IconName.Clock}
          text={t('recent_locations')}
        />
        <ul className={styles.list}>
          {recentLocations.map((location) => (
            <LocationItem
              key={location.id}
              name={location.name}
              description={location.description}
              isFavorite={favoriteLocations.some((f) => f.id === location.id)}
              onSelect={() => changeCurrentLocation(location)}
              onToggleFavorite={() => toggleFavorite(location)}
            />
          ))}
        </ul>
      </section>
    )
  );
};

export default RecentLocations;
