import styles from './Projects.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { ProjectsAdminPage } from 'pagesComponents/admin/entities/project/ProjectsAdminPage/ProjectsAdminPage';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';

export const Projects = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Проекты' }]} />
      <PageHeading
        heading="Проекты"
        action={
          <Action text="Архив" onClick={() => navigate('/projects/archive')} />
        }
      />
      <ProjectsAdminPage />
    </Layout>
  );
};
