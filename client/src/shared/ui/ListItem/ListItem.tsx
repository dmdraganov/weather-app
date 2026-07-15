import styles from './ListItem.module.scss';
import Icon from '../Icon/Icon';

import type { IconName } from '../Icon/Icon';

interface ListItemProps {
  iconName: IconName;
  title: string;
  value: string | number;
  isVertical?: boolean;
}

const ListItem = ({
  iconName,
  title,
  value,
  isVertical = false,
}: ListItemProps) => {
  return (
    <li className={styles.item + ' ' + (isVertical && styles.itemVertical)}>
      <Icon name={iconName} tone='ui' className={styles.icon} />
      <div className={styles.text + ' ' + (isVertical && styles.textVertical)}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <span>{value}</span>
      </div>
    </li>
  );
};

export default ListItem;
