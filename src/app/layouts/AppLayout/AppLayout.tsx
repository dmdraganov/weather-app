import { Outlet } from 'react-router-dom';
import NavMenu from './NavMenu/NavMenu';
import styles from './AppLayout.module.scss';

export const AppLayout = () => {
  return (
    <div className={'container ' + styles.flexContainer}>
      <NavMenu />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
