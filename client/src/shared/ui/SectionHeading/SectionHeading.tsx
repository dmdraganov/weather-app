import styles from './SectionHeading.module.scss';
import Icon from '../Icon/Icon';

import type { IconName } from '../Icon/Icon';

interface IProps {
  name: IconName;
  text: string;
}

const SectionHeading = ({ name, text }: IProps) => {
  return (
    <h2 className={styles.sectionHeading}>
      <Icon name={name} className={styles.icon} />
      {text}
    </h2>
  );
};

export default SectionHeading;
