import styles from './ProjectEdition.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { EditIcon, PlusIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectCreationPage } from 'pagesComponents';
import { ProjectActionsPage } from 'pagesComponents/projects/ProjectActionsPage/ProjectActionsPage';
import { useProject } from 'hooks/queries/entities/useProject';
import PageLoader from 'components/PageLoader/PageLoader';

export const ProjectEdition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    apiData: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProject(id as string);

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/projects', alias: 'Проекты' },
          { alias: 'Редактировать проект' },
        ]}
      />

      {isProjectLoading ? (
        <PageLoader />
      ) : isProjectError ? (
        <></>
      ) : (
        <>
          <PageHeading heading="Редактировать проект" />
          <ProjectActionsPage project={project!} />
        </>
      )}
    </Layout>
  );
};
