import styles from './NavMenu.module.scss';
import LinkButton from '../../../shared/ui/LinkButton/LinkButton';
import { useTranslation } from 'react-i18next';
import { NAV_MENU } from './NavMenu.data';
import { I18N_NAMESPACES } from '../../../shared/config/i18n';
import { useLocationStore } from '../../../modules/location/model/store/store';
import { getWeatherNavigationTarget } from '../../../modules/location/lib/location-url';
import { ROUTES } from '../../../shared/config/routes';

const NavMenu = () => {
  const { t } = useTranslation(I18N_NAMESPACES.shared);
  const currentLocation = useLocationStore((state) => state.currentLocation);

  return (
    <nav className={styles.navMenu + ' division'}>
      {NAV_MENU.map(({ name, textKey, path }) => {
        const to =
          path === ROUTES.home && currentLocation
            ? getWeatherNavigationTarget(currentLocation?.coordinates)
            : path;

        return (
          <LinkButton
            key={textKey}
            to={to}
            name={name}
            text={t(textKey)}
            end={path === ROUTES.home}
          />
        );
      })}
    </nav>
  );
};

export default NavMenu;
