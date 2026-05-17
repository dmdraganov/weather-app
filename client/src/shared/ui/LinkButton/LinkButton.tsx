import styles from './LinkButton.module.scss';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';

import type { IconName } from '../Icon/Icon';

interface IProps {
  name: IconName;
  text: string;
  to: string;
}

const LinkButton = ({ name, text, to }: IProps) => {
  return (
    <Link className={styles.linkButton} to={to}>
      <Icon name={name} className={styles.icon} />
      <span>{text}</span>
    </Link>
  );
};

export default LinkButton;
