import styles from './Projects.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { ProjectsPage } from 'pagesComponents';

export const Projects = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ link: '/projects', alias: 'Проекты' }]} />
      <PageHeading
        heading="Наши проекты"
        action={
          <Action
            text="Создать новый"
            icon={<PlusIcon />}
            onClick={() => navigate('/projects/create')}
          />
        }
      />
      <ProjectsPage />
    </Layout>
  );
};
