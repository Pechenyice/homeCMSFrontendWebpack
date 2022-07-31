import { LogoIcon } from 'assets/icons';
import { Button, ELoaderPalette, H1, Loader, Text } from 'components/kit';
import styles from './PageLoader.module.scss';

const PageLoader = () => {
  return (
    <div className={styles.wrapper}>
      <Loader palette={ELoaderPalette.DARK} />
    </div>
  );
};

export default PageLoader;
