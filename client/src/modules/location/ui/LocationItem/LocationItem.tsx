import styles from './LocationItem.module.scss';
import HeartIcon from '../../../../shared/assets/icons/ui/heart.svg?react';

interface LocationItemProps {
  name: string;
  description: string;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
}

const LocationItem = ({
  name,
  description,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: LocationItemProps) => {
  return (
    <li className={styles.item}>
      <div className={styles.itemText} onClick={onSelect}>
        <h3 className={styles.itemHeading}>{name}</h3>
        <span className={styles.itemAddition}>{description}</span>
      </div>
      <button
        className={styles.favoriteButton}
        onClick={onToggleFavorite}
        style={isFavorite ? { opacity: 1 } : undefined}
        data-favorite={isFavorite || undefined}
      >
        <HeartIcon className={styles.favoriteIcon} />
      </button>
    </li>
  );
};

export default LocationItem;
