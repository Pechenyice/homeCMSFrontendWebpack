import styles from './Project.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Modal, Text } from 'components/kit';
import { EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery, useQueryClient } from 'react-query';
import { getProjectKey } from 'hooks/queries/keys';
import { API } from 'api/controller';
import { useProject } from 'hooks/queries/entities/project/useProject';
import PageLoader from 'components/PageLoader/PageLoader';
import { useState } from 'react';
import { useErrors } from 'hooks/useErrors';
import { useInfos } from 'hooks/useInfos';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useAuth } from 'hooks';
import { downloadProject } from 'utils/print';

export const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleLogout, profile } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProject(id as string);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePrint = async () => {
    try {
      if (!profile?.id) throw new AuthError('Данные пользователя не найдены');

      await downloadProject(profile.id as any, id as any);
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

  const handleDelete = async () => {
    try {
      if (!profile?.id || !id || isNaN(id as any)) {
        addError('Не удалось отклонить заявку');
        return;
      }

      setIsLoading(true);

      await API.project.delete(id as any, profile.id as any);

      setIsLoading(false);

      addInfo('Проект успешно удален!');

      await queryClient.invalidateQueries(
        getProjectKey(id as any, profile.id as any)
      );

      navigate('/projects');
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при удалении проекта!');
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
                text="Редактировать"
                icon={<EditIcon />}
                onClick={() => navigate(`/projects/${id}/edit`)}
              />
            }
            menu={
              <Dropdown placement="right">
                <div className={styles.dropdownElem} onClick={handlePrint}>
                  <Text isMedium>Распечатать</Text>
                </div>
                <div
                  className={styles.dropdownElem}
                  onClick={handleToggleModal}
                >
                  <Text isMedium className={styles.delete}>
                    Удалить
                  </Text>
                </div>
              </Dropdown>
            }
          />
          <ProjectPage project={project!} />
        </>
      )}
      {isModalOpen && (
        <Modal
          isOpen
          isNegative
          text="Вы действительно хотите удалить проект?"
          submitText="Удалить"
          cancelText="Отмена"
          onSubmit={isLoading ? undefined : (handleDelete as any)}
          onCancel={handleToggleModal}
        />
      )}
    </Layout>
  );
};
