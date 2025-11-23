import { useContext } from 'react';
import LocationItem from '../../../../components/LocationItem/LocationItem';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import { FavoriteLocationsContext } from '../../../../contexts/FavoriteLocationsContext';
import styles from './FavoriteLocations.module.scss';

const FavoriteLocations = () => {
  const [favoriteLocations] = useContext(FavoriteLocationsContext);

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
