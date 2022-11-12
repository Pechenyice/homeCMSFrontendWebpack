import { LogoIcon } from 'assets/icons';
import { Button, Text } from 'components/kit';
import { useAuth } from 'hooks/index';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from '..';
import styles from './AdminHeader.module.scss';

interface Props {
  isUnauthorized?: boolean;
}

export const AdminHeader = (props: Props) => {
  const { isUnauthorized } = props;

  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  if (isUnauthorized) {
    return (
      <div className={styles.wrapper}>
        <a href="/" className={styles.logoWrapper}>
          <LogoIcon />
        </a>
      </div>
    );
  }

  const bindNavigate = (path: string) => () => {
    navigate(path);
  };

  return (
    <div className={styles.wrapper}>
      <a href="/" className={styles.logoWrapper}>
        <LogoIcon />
      </a>
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
        <Link to={'/methodologies'}>
          <Text isMedium>Методики и технологии</Text>
        </Link>
      </nav>
      <Dropdown
        customControl={
          <Button className={styles.button}>
            <Text isMedium>Админ-панель</Text>
          </Button>
        }
        placement="right"
      >
        <div className={styles.dropdownElem} onClick={bindNavigate('/admin')}>
          <Text isMedium>Админ-меню</Text>
        </div>
        <div className={styles.dropdownElem} onClick={bindNavigate('/library')}>
          <Text isMedium>Библиотека терминов</Text>
        </div>
        <div
          className={styles.dropdownElem}
          onClick={bindNavigate('/statistic')}
        >
          <Text isMedium>Статистика</Text>
        </div>
        <div className={styles.dropdownElem} onClick={handleLogout}>
          <Text isMedium className={styles.delete}>
            Выйти
          </Text>
        </div>
      </Dropdown>
    </div>
  );
};
