import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import LocationItem from '../../ui/LocationItem/LocationItem';
import { useLocationStore } from '../../models/store';
import styles from './RecentLocations.module.scss';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';

const RecentLocations = () => {
  const { recentLocations } = useLocationStore();
  const { t } = useTranslation('location');

  return (
    !!recentLocations.length && (
      <section className='division'>
        <SectionHeading name={IconName.Clock} text={t('recent_locations')} />
        <ul className={styles.list}>
          {recentLocations.map((location) => (
            <LocationItem key={location.id} location={location} />
          ))}
        </ul>
      </section>
    )
  );
};

export default RecentLocations;
