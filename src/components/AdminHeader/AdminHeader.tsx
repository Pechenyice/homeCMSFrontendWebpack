import { LogoIcon } from 'assets/icons';
import { Button, Text } from 'components/kit';
import { Link } from 'react-router-dom';
import styles from './AdminHeader.module.scss';

interface Props {
  isUnauthorized?: boolean;
}

export const AdminHeader = (props: Props) => {
  const { isUnauthorized } = props;

  if (isUnauthorized) {
    return (
      <div className={styles.wrapper}>
        <LogoIcon />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <LogoIcon />
      <nav className={styles.nav}>
        <Link to={'/users'}>
          <Text isMedium>Организации</Text>
        </Link>
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
        <Link to={'/technologies'}>
          <Text isMedium>Методики и технологии</Text>
        </Link>
      </nav>
      <Link to={'/admin'}>
        <Button className={styles.button}>
          <Text isMedium>Админ-панель</Text>
        </Button>
      </Link>
    </div>
  );
};
