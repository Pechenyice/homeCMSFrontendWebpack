import styles from './Statistic.module.scss';
import { PageHeading } from 'components';
import { Breadcrumbs, Layout, Text } from 'components/kit';
import { LockHiddenIcon } from 'assets/icons';
import { StatisticPage } from 'pagesComponents/admin/internal/StatisticPage/StatisticPage';

export const Statistic = () => {
  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Результаты' }]} />
      <PageHeading heading="Результаты" />
      <StatisticPage />
    </Layout>
  );
};
