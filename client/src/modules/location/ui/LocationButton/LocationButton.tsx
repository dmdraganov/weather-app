import styles from './LocationButton.module.scss';
import LocationIcon from '../../../../shared/assets/icons/ui/location.svg?react';
import ArrowIcon from '../../../../shared/assets/icons/ui/arrow.svg?react';
import { useLocationStore } from '../../models/store';

type Props = {
  onClick: () => void;
  arrowDirection: 'back' | 'forward';
};

const LocationButton = ({ onClick, arrowDirection }: Props) => {
  const { currentLocation } = useLocationStore();

  const isBack = arrowDirection === 'back';
  return (
    <button
      onClick={onClick}
      className={styles.button}
      style={!currentLocation ? { visibility: 'hidden' } : undefined}
    >
      <LocationIcon className={styles.locationIcon} />
      {currentLocation && (
        <h1 className={styles.selectedLocation}>{currentLocation.name}</h1>
      )}
      <ArrowIcon
        className={
          styles.arrowIcon +
          ' ' +
          (isBack ? styles.backArrowIcon : styles.forwardArrowIcon)
        }
      />
    </button>
  );
};

export default LocationButton;
