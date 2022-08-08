import styles from './Projects.module.scss';
import { PageHeading } from 'components';
import { Breadcrumbs, Layout } from 'components/kit';
import { ProjectsAdminPage } from 'pagesComponents/admin/entities/project/ProjectsAdminPage/ProjectsAdminPage';

export const Projects = () => {
  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Проекты' }]} />
      <PageHeading heading="Проекты" />
      <ProjectsAdminPage />
    </Layout>
  );
};
