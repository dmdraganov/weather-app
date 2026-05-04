import { useLocationStore } from '../../models/store';
import LocationItem from '../../ui/LocationItem/LocationItem';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import styles from './CurrentLocation.module.scss';

const CurrentLocation = () => {
  const { currentLocation } = useLocationStore();

  return (
    currentLocation && (
      <div className={styles.container}>
        <SectionHeading iconId='explore' text='Current location' />
        <LocationItem location={currentLocation} />
      </div>
    )
  );
};

export default CurrentLocation;
