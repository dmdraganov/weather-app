import styles from './LinkButton.module.scss';
import { NavLink, type To } from 'react-router-dom';
import Icon from '../Icon/Icon';

import type { IconName } from '../Icon/Icon';

interface IProps {
  name: IconName;
  text: string;
  to: To;
  end?: boolean;
}

const LinkButton = ({ name, text, to, end = false }: IProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${styles.linkButton} ${isActive ? styles.active : ''}`
      }
      to={to}
      end={end}
    >
      <Icon name={name} tone='ui' className={styles.icon} />
      <span>{text}</span>
    </NavLink>
  );
};

export default LinkButton;
