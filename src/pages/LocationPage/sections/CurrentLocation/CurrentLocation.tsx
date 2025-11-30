import { useContext } from 'react';
import { LocationContext } from '../../../../contexts/LocationContext';
import LocationItem from '../../../../components/LocationItem/LocationItem';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import styles from './CurrentLocation.module.scss';

const CurrentLocation = () => {
  const { currentLocation } = useContext(LocationContext);

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
