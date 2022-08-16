import styles from './ProjectsArchive.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { ProjectsAdminPage } from 'pagesComponents/admin/entities/project/ProjectsAdminPage/ProjectsAdminPage';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';

export const ProjectsArchive = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { alias: 'Проекты', link: '/projects' },
          { alias: 'Архив проектов' },
        ]}
      />
      <PageHeading heading="Архив проектов" />
      <ProjectsAdminPage isArchived />
    </Layout>
  );
};
