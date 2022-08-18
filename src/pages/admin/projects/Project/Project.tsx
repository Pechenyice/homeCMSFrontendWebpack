import styles from './Project.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { ChevronRightIcon, EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery, useQueryClient } from 'react-query';
import { getProjectKey } from 'hooks/queries/keys';
import { API } from 'api/controller';
import { useProject } from 'hooks/queries/entities/useProject';
import PageLoader from 'components/PageLoader/PageLoader';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useAuth, useErrors, useInfos } from 'hooks/index';
import { downloadProject } from 'utils/print';

export const Project = () => {
  const { id, userId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { handleLogout } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProject(id as string, userId as any);

  const handlePrint = async () => {
    try {
      await downloadProject(userId as any, id as any);
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при скачивании проекта!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  const handleRestore = async () => {
    try {
      await API.project.restore(userId as any, id as any);

      addInfo('Проект успешно восстановлен!');

      queryClient.invalidateQueries('project');

      navigate('/projects');
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при скачивании проекта!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
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
            isDeleted={project!.isDeleted}
            isBest={project!.isBest}
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
                <div className={styles.dropdownElem} onClick={handleRestore}>
                  <Text isMedium>Восстановить</Text>
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
