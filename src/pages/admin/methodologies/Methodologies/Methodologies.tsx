import styles from './Methodologies.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { useNavigate } from 'react-router-dom';
import { MethodologiesAdminPage } from 'pagesComponents/admin/entities/methodology/MethodologiesAdminPage/MethodologiesAdminPage';

export const Methodologies = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Методики и технологии' }]} />
      <PageHeading
        heading="Методики и технологии"
        action={
          <Action
            text="Архив"
            onClick={() => navigate('/methodologies/archive')}
          />
        }
      />
      <MethodologiesAdminPage />
    </Layout>
  );
};
