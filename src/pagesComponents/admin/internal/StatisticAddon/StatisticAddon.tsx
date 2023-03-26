import { ApiError, AuthError, ServerError } from 'api/errors';
import styles from './StatisticAddon.module.scss';
import { Button, Text, H1 } from 'components/kit';
import { exportCsv } from 'utils/exportCsv';
import { useAuth, useErrors } from 'hooks';

export const StatisticAddon = () => {
  const { handleLogout } = useAuth();
  const { addError } = useErrors();

  const bindExport = (path: string) => async () => {
    window.open(`/api/public/v1/stats/csv/${path}`);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <Button onClick={bindExport('companies')}>
          <Text isMedium>Экспорт организаций</Text>
        </Button>
        <Button onClick={bindExport('social-projects')}>
          <Text isMedium>Экспорт проектов</Text>
        </Button>
        <Button onClick={bindExport('clubs')}>
          <Text isMedium>Экспорт клубов</Text>
        </Button>
        <Button onClick={bindExport('methodologies')}>
          <Text isMedium>Экспорт методик и технологий</Text>
        </Button>
        <Button onClick={bindExport('social-works')}>
          <Text isMedium>Экспорт соц. работ</Text>
        </Button>
        <Button onClick={bindExport('edu-programs')}>
          <Text isMedium>Экспорт доп. образовательных программ</Text>
        </Button>
      </div>

      <H1 className={styles.header}>Результаты</H1>
    </div>
  );
};
