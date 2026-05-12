import styles from './NavMenu.module.scss';
import LinkButton from '../LinkButton/LinkButton';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../shared/ui/Icon/icon-map';

const buttonArr: { name: IconName; text: string; path: string }[] = [
  {
    name: IconName.RainDay,
    text: 'weather',
    path: '/',
  },
  {
    name: IconName.Location,
    text: 'cities',
    path: '/location',
  },
  {
    name: IconName.Settings,
    text: 'settings',
    path: '/settings',
  },
];

const NavMenu = () => {
  const { t } = useTranslation('shared');
  return (
    <nav className={styles.navMenu + ' division'}>
      {buttonArr.map((element) => (
        <LinkButton
          key={element.text}
          to={element.path}
          name={element.name}
          text={t(element.text)}
        />
      ))}
    </nav>
  );
};

export default NavMenu;
