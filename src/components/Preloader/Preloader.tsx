import { LogoIcon } from 'assets/icons';
import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.wrapper}>
      <LogoIcon />
    </div>
  );
};

export default Preloader;
