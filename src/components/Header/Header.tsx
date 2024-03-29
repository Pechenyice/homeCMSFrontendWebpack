import { LogoIcon } from 'assets/icons';
import { Button, Text } from 'components/kit';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

interface Props {
  isUnauthorized?: boolean;
}

export const Header = (props: Props) => {
  const { isUnauthorized } = props;

  if (isUnauthorized) {
    return (
      <div className={styles.wrapper}>
        <a href="/" className={styles.logoWrapper}>
          <LogoIcon />
        </a>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <a href="/" className={styles.logoWrapper}>
        <LogoIcon />
      </a>
      <nav className={styles.nav}>
        <Link to={'/projects'}>
          <Text isMedium>Проекты</Text>
        </Link>
        <Link to={'/education'}>
          <Text isMedium>Доп. образование</Text>
        </Link>
        <Link to={'/social'}>
          <Text isMedium>Соц. работа</Text>
        </Link>
        <Link to={'/clubs'}>
          <Text isMedium>Клубы</Text>
        </Link>
        <Link to={'/methodologies'}>
          <Text isMedium>Методики и технологии</Text>
        </Link>
      </nav>
      <Link to={'/profile'}>
        <Button className={styles.button}>
          <Text isMedium>Профиль</Text>
        </Button>
      </Link>
    </div>
  );
};
