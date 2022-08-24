import styles from './AdminPanel.module.scss';
import { PageHeading } from 'components';
import { Breadcrumbs, Layout, Text } from 'components/kit';
import { LockHiddenIcon } from 'assets/icons';

export const AdminPanel = () => {
  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Админ-меню' }]} />
      <PageHeading heading="Админ-меню" />
      <div className={styles.flex}>
        <Text isMedium>Раздел в разработке</Text>
        <LockHiddenIcon />
      </div>
    </Layout>
  );
};
