import Header from './Header/Header';
import Main from './Main/Main';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Main />
    </div>
  );
};

export default HomePage;
