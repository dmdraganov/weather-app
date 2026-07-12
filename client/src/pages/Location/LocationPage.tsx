import FavoriteLocations from '../../modules/location/widgets/FavoriteLocations/FavoriteLocations';
import RecentLocations from '../../modules/location/widgets/RecentLocations/RecentLocations';
import styles from './LocationPage.module.scss';
import WorldMap from '../../modules/location/widgets/WorldMap/WorldMap';
import CurrentLocation from '../../modules/location/widgets/CurrentLocation/CurrentLocation';
import LocationSearch from '../../modules/location/widgets/LocationSearch/LocationSearch';

const LocationPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.sectionsContainer}>
          <LocationSearch />
          <CurrentLocation />
          <FavoriteLocations />
          <RecentLocations />
        </div>
        <div className={styles.mapContainer}>
          <WorldMap />
        </div>
      </div>
    </main>
  );
};

export default LocationPage;
