import styles from './Library.module.scss';
import { PageHeading } from 'components';
import { Breadcrumbs, Layout, Text } from 'components/kit';
import { LockHiddenIcon } from 'assets/icons';

export const Library = () => {
  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Библиотека терминов' }]} />
      <PageHeading heading="Библиотека терминов" />
      <div className={styles.flex}>
        <Text isMedium>Раздел в разработке</Text>
        <LockHiddenIcon />
      </div>
    </Layout>
  );
};
