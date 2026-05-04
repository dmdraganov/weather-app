import FavoriteLocations from '../../modules/location/widgets/FavoriteLocations/FavoriteLocations';
import RecentLocations from '../../modules/location/widgets/RecentLocations/RecentLocations';
import styles from './LocationPage.module.scss';

import WorldMap from '../../modules/location/widgets/WorldMap/WorldMap';
import CurrentLocation from '../../modules/location/widgets/CurrentLocation/CurrentLocation';
import LocationButton from '../../modules/location/ui/LocationButton/LocationButton';
import LocationSearch from '../../modules/location/widgets/LocationSearch/LocationSearch';

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
              <LocationSearch />
              <CurrentLocation />
              <FavoriteLocations />
              <RecentLocations />
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
