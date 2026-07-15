import FavoriteLocations from '../../modules/location/widgets/FavoriteLocations/FavoriteLocations';
import RecentLocations from '../../modules/location/widgets/RecentLocations/RecentLocations';
import styles from './LocationPage.module.scss';
import WorldMap from '../../modules/location/widgets/WorldMap/WorldMap';
import CurrentLocation from '../../modules/location/widgets/CurrentLocation/CurrentLocation';
import LocationSearch from '../../modules/location/widgets/LocationSearch/LocationSearch';
import EmptyLocationState from '../../modules/location/widgets/EmptyLocationState/EmptyLocationState';
import { useLocationStore } from '../../modules/location/model/store/store';
import { useCurrentLocationInit } from '../../modules/location/hooks/useCurrentLocationInit';

const LocationPage = () => {
  const currentLocation = useLocationStore((state) => state.currentLocation);
  const favoriteLocations = useLocationStore((state) => state.favoriteLocations);
  const recentLocations = useLocationStore((state) => state.recentLocations);
  const { requestCurrentLocation, isLoading, error } = useCurrentLocationInit();
  const isEmpty =
    !currentLocation && favoriteLocations.length === 0 && recentLocations.length === 0;

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.sectionsContainer}>
          <LocationSearch />
          {isEmpty && (
            <EmptyLocationState
              error={error}
              isLoading={isLoading}
              onRequestLocation={() => void requestCurrentLocation()}
            />
          )}
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
