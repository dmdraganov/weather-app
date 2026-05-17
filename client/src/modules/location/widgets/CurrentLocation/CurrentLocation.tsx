import { useLocationStore } from '../../models/store';
import LocationItem from '../../ui/LocationItem/LocationItem';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import styles from './CurrentLocation.module.scss';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';

const CurrentLocation = () => {
  const { currentLocation } = useLocationStore();
  const { t } = useTranslation('location');

  return (
    currentLocation && (
      <div className={styles.container}>
        <SectionHeading name={IconName.Explore} text={t('current_location')} />
        <LocationItem location={currentLocation} />
      </div>
    )
  );
};

export default CurrentLocation;
