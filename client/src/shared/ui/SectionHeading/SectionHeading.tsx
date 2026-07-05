import styles from './SectionHeading.module.scss';
import Icon from '../Icon/Icon';

import type { IconName } from '../Icon/Icon';

interface IProps {
  iconName: IconName;
  text: string;
}

const SectionHeading = ({ iconName, text }: IProps) => {
  return (
    <h2 className={styles.sectionHeading}>
      <Icon name={iconName} className={styles.icon} />
      {text}
    </h2>
  );
};

export default SectionHeading;
