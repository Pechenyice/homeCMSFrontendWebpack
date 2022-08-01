import styles from './Project.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery } from 'react-query';
import { getProjectKey } from 'hooks/queries/keys';
import { API } from 'api/controller';
import { useProject } from 'hooks/queries/entities/useProject';
import PageLoader from 'components/PageLoader/PageLoader';

export const Project = () => {
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
          { alias: 'Просмотр проекта' },
        ]}
      />
      {isProjectLoading ? (
        <PageLoader />
      ) : isProjectError ? (
        <></>
      ) : (
        <>
          <PageHeading
            heading="Просмотр проекта"
            status={project!.status}
            cause={
              <Text isMedium>
                Проект отклонен со следующими ошибками:
                <br />
                {project!.cause}
              </Text>
            }
            action={
              <Action
                text="Редактировать"
                icon={<EditIcon />}
                onClick={() => navigate(`/projects/${id}/edit`)}
              />
            }
          />
          <ProjectPage project={project!} />
        </>
      )}
    </Layout>
  );
};
