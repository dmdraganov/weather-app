import styles from './ListItem.module.scss';
import Icon from '../Icon/Icon';

import type { IconName } from '../Icon/Icon';

interface ListItemProps {
  name: IconName;
  title: string;
  value: string | number;
  isVertical?: boolean;
}

const ListItem = ({
  name,
  title,
  value,
  isVertical = false,
}: ListItemProps) => {
  return (
    <li className={styles.item + ' ' + (isVertical && styles.itemVertical)}>
      <Icon name={name} className={styles.icon} />
      <div className={styles.text + ' ' + (isVertical && styles.textVertical)}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <span>{value}</span>
      </div>
    </li>
  );
};

export default ListItem;
