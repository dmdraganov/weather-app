import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import { useContext, useEffect } from 'react';
import type { Location } from '../../../../types/locationApi';
import LocationItem from '../../../../components/LocationItem/LocationItem';
import { LocationContext } from '../../../../contexts/LocationContext';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import styles from './RecentLocations.module.scss';

const MAX_LOCATIONS_AMOUNT = 3;

const RecentLocations = () => {
  const [selectedLocation] = useContext(LocationContext);
  const [recentLocations, setRecentLocations] = useLocalStorage<Location[]>(
    'recentLocations',
    []
  );

  useEffect(() => {
    if (!selectedLocation) return;
    if (recentLocations.some((location) => location.id === selectedLocation.id))
      return;
    setRecentLocations((prev) =>
      prev.length >= MAX_LOCATIONS_AMOUNT
        ? [...prev.slice(-2), selectedLocation]
        : [...prev, selectedLocation]
    );
  }, [selectedLocation]);

  return (
    <section className='division'>
      <SectionHeading iconId='clock' text='Recent locations' />
      <ul className={styles.list}>
        {recentLocations.length &&
          recentLocations.map((location) => (
            <LocationItem key={location.id} location={location} />
          ))}
      </ul>
    </section>
  );
};

export default RecentLocations;
