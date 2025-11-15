import styles from './NavMenu.module.scss';
import LinkButton from '../../../../components/LinkButton/LinkButton';

const buttonArr = [
  {
    iconID: 'rain-day',
    text: 'weather',
    path: '/',
  },
  {
    iconID: 'explore',
    text: 'explore',
    path: '/explore',
  },
  {
    iconID: 'location',
    text: 'cities',
    path: '/location',
  },
  {
    iconID: 'settings',
    text: 'settings',
    path: '/settings',
  },
];

const NavMenu = () => {
  return (
    <nav className={styles.navMenu + ' division'}>
      {buttonArr.map((element) => (
        <LinkButton key={element.text} to={element.path} {...element} />
      ))}
    </nav>
  );
};

export default NavMenu;
