import FavoriteLocations from './sections/FavoriteLocations/FavoriteLocations';
import RecentLocations from './sections/RecentLocations/RecentLocations';
import SearchLocation from './sections/SearchLocation/SearchLocation';
import styles from './LocationPage.module.scss';
import { FavoriteLocationsProvider } from '../../contexts/FavoriteLocationsProvider';
import LocationButton from '../../components/LocationButton/LocationButton';
import WorldMap from './sections/WorldMap/WorldMap';

const LocationPage = () => {
  return (
    <div className={styles.locationPage}>
      <main className={styles.main}>
        <div className={'container ' + styles.mainContainer}>
          <div className={styles.textContainer}>
            <div className={styles.headerContainer}>
              <LocationButton route='back' />
            </div>
            <div className={styles.sectionsContainer}>
              <FavoriteLocationsProvider>
                <SearchLocation />
                <FavoriteLocations />
                <RecentLocations />
              </FavoriteLocationsProvider>
            </div>
          </div>
          <div className={styles.mapContainer}>
            <WorldMap />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationPage;
