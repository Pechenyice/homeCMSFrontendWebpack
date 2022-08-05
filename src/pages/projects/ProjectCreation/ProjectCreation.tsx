import styles from './ProjectCreation.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { ProjectActionsPage } from 'pagesComponents/projects/ProjectActionsPage/ProjectActionsPage';

export const ProjectCreation = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/projects', alias: 'Проекты' },
          { alias: 'Создать проект' },
        ]}
      />
      <PageHeading heading="Создать проект" />
      <ProjectActionsPage project={null} />
    </Layout>
  );
};
