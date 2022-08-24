import styles from './Statistic.module.scss';
import { PageHeading } from 'components';
import { Breadcrumbs, Layout, Text } from 'components/kit';
import { LockHiddenIcon } from 'assets/icons';

export const Statistic = () => {
  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Результаты' }]} />
      <PageHeading heading="Результаты" />
      <div className={styles.flex}>
        <Text isMedium>Раздел в разработке</Text>
        <LockHiddenIcon />
      </div>
    </Layout>
  );
};
