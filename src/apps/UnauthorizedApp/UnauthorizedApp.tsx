import { Auth, Header } from 'components';
import styles from './UnauthorizedApp.module.scss';

const UnauthorizedApp = () => {
  return (
    <section className={styles.wrapper}>
      <Header isUnauthorized />
      <div className={styles.filler}>
        <Auth />
      </div>
    </section>
  );
};

export default UnauthorizedApp;
