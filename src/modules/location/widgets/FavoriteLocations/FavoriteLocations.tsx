import { useLocationStore } from '../../models/store';
import LocationItem from '../../ui/LocationItem/LocationItem';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import styles from './FavoriteLocations.module.scss';
import { useTranslation } from 'react-i18next';

const FavoriteLocations = () => {
  const { favoriteLocations } = useLocationStore();
  const { t } = useTranslation('location');

  return (
    !!favoriteLocations.length && (
      <section className={'division ' + styles.container}>
        <SectionHeading iconId='heart' text={t('favorite_locations')} />
        <ul className={styles.list}>
          {favoriteLocations.map((location) => (
            <LocationItem key={location.id} location={location} />
          ))}
        </ul>
      </section>
    )
  );
};

export default FavoriteLocations;
