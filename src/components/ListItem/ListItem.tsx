import styles from './ListItem.module.scss';
import sprite from '../../assets/icons/sprite.svg';

interface ListItemProps {
  iconID: string;
  title: string;
  value: string | number;
  isVertical?: boolean;
}

const ListItem = ({
  iconID,
  title,
  value,
  isVertical = false,
}: ListItemProps) => {
  return (
    <li className={styles.item + ' ' + (isVertical && styles.itemVertical)}>
      <svg className={styles.icon}>
        <use xlinkHref={sprite + '#' + iconID} />
      </svg>
      <div className={styles.text + ' ' + (isVertical && styles.textVertical)}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <span>{value}</span>
      </div>
    </li>
  );
};

export default ListItem;
