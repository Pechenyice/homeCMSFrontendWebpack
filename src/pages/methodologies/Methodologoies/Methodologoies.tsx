import styles from './Methodologies.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { MethodologiesPage } from 'pagesComponents/methodologies/MethodologiesPage/MethodologiesPage';

export const Methodologoies = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Методики и технологии' }]} />
      <PageHeading
        heading="Методики и технологии"
        action={
          <Action
            text="Создать новую"
            icon={<PlusIcon />}
            onClick={() => navigate('/methodologies/create')}
          />
        }
      />
      <MethodologiesPage />
    </Layout>
  );
};
