import styles from './Companies.module.scss';
import { PageHeading } from 'components';
import { Breadcrumbs, Layout } from 'components/kit';
import { CompaniesAdminPage } from 'pagesComponents/admin/CompaniesAdminPage/CompaniesAdminPage';

export const Companies = () => {
  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Все организации' }]} />
      <PageHeading heading="Все организации" />
      <CompaniesAdminPage />
    </Layout>
  );
};
