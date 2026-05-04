import { useLocationStore } from '../../models/store';
import LocationItem from '../../ui/LocationItem/LocationItem';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import styles from './FavoriteLocations.module.scss';

const FavoriteLocations = () => {
  const { favoriteLocations } = useLocationStore();

  return (
    !!favoriteLocations.length && (
      <section className={'division ' + styles.container}>
        <SectionHeading iconId='heart' text='Favorite locations' />
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
