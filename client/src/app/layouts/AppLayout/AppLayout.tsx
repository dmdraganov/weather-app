import { Outlet } from 'react-router-dom';
import NavMenu from '../../widgets/NavMenu/NavMenu';
import styles from './AppLayout.module.scss';

export const AppLayout = () => {
  return (
    <div className='container'>
      <div className={styles.layout}>
        <NavMenu />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
