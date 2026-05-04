import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import LocationItem from '../../ui/LocationItem/LocationItem';
import { useLocationStore } from '../../models/store';
import styles from './RecentLocations.module.scss';

const RecentLocations = () => {
  const { recentLocations } = useLocationStore();

  return (
    !!recentLocations.length && (
      <section className='division'>
        <SectionHeading iconId='clock' text='Recent locations' />
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
