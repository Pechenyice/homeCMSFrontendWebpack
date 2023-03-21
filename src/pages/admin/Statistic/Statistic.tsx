import styles from './Statistic.module.scss';
import { PageHeading } from 'components';
import { Breadcrumbs, Layout, Text } from 'components/kit';
import { LockHiddenIcon } from 'assets/icons';
import { StatisticPage } from 'pagesComponents/admin/internal/StatisticPage/StatisticPage';
import { StatisticAddon } from 'pagesComponents/admin/internal/StatisticAddon/StatisticAddon';

export const Statistic = () => {
  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Статистика' }]} />
      <PageHeading heading="Экспорт данных в формате csv" />
      <StatisticAddon />
      <StatisticPage />
    </Layout>
  );
};
