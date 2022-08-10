import styles from './Project.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { ChevronRightIcon, EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery } from 'react-query';
import { getProjectKey } from 'hooks/queries/keys';
import { API } from 'api/controller';
import { useProject } from 'hooks/queries/entities/useProject';
import PageLoader from 'components/PageLoader/PageLoader';

export const Project = () => {
  const { id, userId } = useParams();
  const navigate = useNavigate();

  const {
    apiData: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProject(id as string, userId as any);

  const handlePrint = () => {
    window.print();
  };

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
                text="Перейти к организации-создателю"
                onClick={() => navigate(`/users/${userId}`)}
              />
            }
            menu={
              <Dropdown placement="right">
                <div className={styles.dropdownElem} onClick={handlePrint}>
                  <Text isMedium>Распечатать</Text>
                </div>
              </Dropdown>
            }
          />
          <ProjectPage project={project!} isAdmin />
        </>
      )}
    </Layout>
  );
};
