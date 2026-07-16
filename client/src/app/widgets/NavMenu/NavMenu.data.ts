import { ROUTES } from '../../../shared/config/routes';
import { IconName } from '../../../shared/ui/Icon/icon-map';

interface NavMenuItem {
  name: IconName;
  textKey: string;
  path: string;
}

export const NAV_MENU: NavMenuItem[] = [
  {
    name: IconName.RainDay,
    textKey: 'weather',
    path: ROUTES.home,
  },
  {
    name: IconName.Location,
    textKey: 'cities',
    path: ROUTES.location,
  },
  {
    name: IconName.Settings,
    textKey: 'settings',
    path: ROUTES.settings,
  },
];
