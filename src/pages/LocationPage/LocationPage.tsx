import FavoriteLocations from './sections/FavoriteLocations/FavoriteLocations';
import RecentLocations from './sections/RecentLocations/RecentLocations';
import SearchLocation from './sections/SearchLocation/SearchLocation';
import styles from './LocationPage.module.scss';
import { FavoriteLocationsProvider } from '../../contexts/FavoriteLocationsProvider';
import LocationButton from '../../components/LocationButton/LocationButton';
import WorldMap from './sections/WorldMap/WorldMap';
import CurrentLocation from './sections/CurrentLocation/CurrentLocation';

const LocationPage = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={'container ' + styles.mainContainer}>
          <div className={styles.textContainer}>
            <header className={styles.headerContainer}>
              <LocationButton route='back' />
            </header>
            <div className={styles.sectionsContainer}>
              <FavoriteLocationsProvider>
                <SearchLocation />
                <CurrentLocation />
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
